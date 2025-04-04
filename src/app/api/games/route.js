// app/api/games/route.js
import { NextResponse } from 'next/server';
import { Client, Databases, Query, ID, IndexType } from 'node-appwrite';

// Initialize Appwrite
const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY); // Server API key

const databases = new Databases(client);

// Configuration
const DATABASE_ID = 'game_shop_db';
const GAMES_COLLECTION_ID = 'games';
const KEYS_COLLECTION_ID = 'game_keys';

// Initialize database and collections if they don't exist
async function ensureDatabaseAndCollections() {
    try {
        // Check if database exists, create if it doesn't
        try {
            await databases.get(DATABASE_ID);
            console.log('Database exists');
        } catch (error) {
            if (error.code === 404) {
                await databases.create(DATABASE_ID, 'Game Shop Database');
                console.log('Database created successfully');
            } else {
                throw error;
            }
        }

        // Check if games collection exists, create if it doesn't
        try {
            await databases.getCollection(DATABASE_ID, GAMES_COLLECTION_ID);
            console.log('Games collection exists');
        } catch (error) {
            if (error.code === 404) {
                await databases.createCollection(DATABASE_ID, GAMES_COLLECTION_ID, 'Games Collection');

                // Create necessary attributes for the games collection
                await databases.createStringAttribute(DATABASE_ID, GAMES_COLLECTION_ID, 'title', 255, true);
                await databases.createStringAttribute(DATABASE_ID, GAMES_COLLECTION_ID, 'description', 5000, false);
                await databases.createStringAttribute(DATABASE_ID, GAMES_COLLECTION_ID, 'image', 255, false);
                await databases.createFloatAttribute(DATABASE_ID, GAMES_COLLECTION_ID, 'popularity', false);
                await databases.createStringAttribute(DATABASE_ID, GAMES_COLLECTION_ID, 'genre', 100, false);
                await databases.createBooleanAttribute(DATABASE_ID, GAMES_COLLECTION_ID, 'featured', false);
                await databases.createDatetimeAttribute(DATABASE_ID, GAMES_COLLECTION_ID, 'releaseDate', false);

                // Add review-related attributes
                await databases.createStringAttribute(DATABASE_ID, GAMES_COLLECTION_ID, 'reviewText', 1000, false);
                await databases.createFloatAttribute(DATABASE_ID, GAMES_COLLECTION_ID, 'reviewScore', false);
                await databases.createStringAttribute(DATABASE_ID, GAMES_COLLECTION_ID, 'youtubeReviewLink', 255, false);

                // Create indexes
                await databases.createIndex(DATABASE_ID, GAMES_COLLECTION_ID, 'title_index', IndexType.Fulltext, ['title']);
                await databases.createIndex(DATABASE_ID, GAMES_COLLECTION_ID, 'genre_index', IndexType.Key, ['genre']);
                await databases.createIndex(DATABASE_ID, GAMES_COLLECTION_ID, 'featured_index', IndexType.Key, ['featured']);
                await databases.createIndex(DATABASE_ID, GAMES_COLLECTION_ID, 'popularity_index', IndexType.Key, ['popularity']);

                console.log('Games collection and attributes created successfully');
            } else {
                throw error;
            }
        }

        // Check if keys collection exists, create if it doesn't
        try {
            await databases.getCollection(DATABASE_ID, KEYS_COLLECTION_ID);
            console.log('Keys collection exists');
        } catch (error) {
            if (error.code === 404) {
                await databases.createCollection(DATABASE_ID, KEYS_COLLECTION_ID, 'Game Keys Collection');

                // Create necessary attributes for the keys collection
                await databases.createStringAttribute(DATABASE_ID, KEYS_COLLECTION_ID, 'gameId', 36, true);
                await databases.createStringAttribute(DATABASE_ID, KEYS_COLLECTION_ID, 'key', 100, true);
                await databases.createStringAttribute(DATABASE_ID, KEYS_COLLECTION_ID, 'platform', 100, true);
                await databases.createFloatAttribute(DATABASE_ID, KEYS_COLLECTION_ID, 'price', true);
                await databases.createFloatAttribute(DATABASE_ID, KEYS_COLLECTION_ID, 'discountPercentage', false);
                await databases.createStringAttribute(DATABASE_ID, KEYS_COLLECTION_ID, 'userId', 36, false);
                await databases.createDatetimeAttribute(DATABASE_ID, KEYS_COLLECTION_ID, 'soldAt', false);
                await databases.createBooleanAttribute(DATABASE_ID, KEYS_COLLECTION_ID, 'isSold', false);

                // Add a longer delay to ensure attributes are properly created before creating indexes
                console.log('Waiting for attributes to be ready...');
                await new Promise(resolve => setTimeout(resolve, 3000));

                // Create indexes with individual try/catch blocks
                const indexesToCreate = [
                    { name: 'gameId_index', attribute: 'gameId' },
                    { name: 'platform_index', attribute: 'platform' },
                    { name: 'userId_index', attribute: 'userId' },
                    { name: 'isSold_index', attribute: 'isSold' }
                ];

                for (const index of indexesToCreate) {
                    try {
                        await databases.createIndex(
                            DATABASE_ID,
                            KEYS_COLLECTION_ID,
                            index.name,
                            IndexType.Key,
                            [index.attribute]
                        );
                        console.log(`Created index: ${index.name}`);
                    } catch (indexError) {
                        console.warn(`Failed to create index ${index.name}: ${indexError.message}`);
                        // Continue with other indexes
                    }
                }

                console.log('Keys collection and attributes created successfully');
            } else {
                throw error;
            }
        }

    } catch (error) {
        console.error('Database setup error:', error);
        throw error;
    }
}

// GET endpoint to retrieve games
export async function GET(request) {
    try {
        await ensureDatabaseAndCollections();
        const url = new URL(request.url);

        // Parse query parameters
        const limit = parseInt(url.searchParams.get('limit') || '10');
        const offset = parseInt(url.searchParams.get('offset') || '0');
        const genre = url.searchParams.get('genre');
        const featured = url.searchParams.get('featured');
        const minReviewScore = url.searchParams.get('minReviewScore');
        const sortBy = url.searchParams.get('sortBy') || 'popularity';
        const sortOrder = url.searchParams.get('sortOrder') || 'desc';

        // Build query
        let queries = [
            Query.limit(limit),
            Query.offset(offset),
        ];

        // Add filters if specified
        if (genre) queries.push(Query.equal('genre', genre));
        if (featured === 'true') queries.push(Query.equal('featured', true));
        if (minReviewScore) queries.push(Query.greaterThanEqual('reviewScore', parseFloat(minReviewScore)));

        // Add sorting
        queries.push(
            sortOrder.toLowerCase() === 'asc'
                ? Query.orderAsc(sortBy)
                : Query.orderDesc(sortBy)
        );

        // Fetch games from Appwrite
        const response = await databases.listDocuments(
            DATABASE_ID,
            GAMES_COLLECTION_ID,
            queries
        );

        // If we need to include available keys info
        const includeKeysInfo = url.searchParams.get('includeKeysInfo') === 'true';
        let gamesWithKeys = response.documents;

        if (includeKeysInfo) {
            // For each game, get the available keys (not sold)
            const gameIds = response.documents.map(game => game.$id);

            // Fetch all available keys for these games
            const keysResponse = await databases.listDocuments(
                DATABASE_ID,
                KEYS_COLLECTION_ID,
                [
                    Query.equal('isSold', false),
                    Query.equal('gameId', gameIds),
                ]
            );

            // Group keys by gameId
            const keysByGameId = {};
            keysResponse.documents.forEach(key => {
                if (!keysByGameId[key.gameId]) {
                    keysByGameId[key.gameId] = [];
                }
                keysByGameId[key.gameId].push(key);
            });

            // Add keys info to each game
            gamesWithKeys = response.documents.map(game => {
                const availableKeys = keysByGameId[game.$id] || [];

                // Get min, max, and avg prices
                let minPrice = null;
                let maxPrice = null;
                let avgPrice = 0;

                if (availableKeys.length > 0) {
                    const prices = availableKeys.map(key => {
                        // Apply discount if available
                        return key.price * (1 - (key.discountPercentage || 0) / 100);
                    });

                    minPrice = Math.min(...prices);
                    maxPrice = Math.max(...prices);
                    avgPrice = prices.reduce((sum, price) => sum + price, 0) / prices.length;
                }

                // Get available platforms
                const platforms = [...new Set(availableKeys.map(key => key.platform))];

                return {
                    id: game.$id,
                    ...game,
                    keysInfo: {
                        availableCount: availableKeys.length,
                        minPrice,
                        maxPrice,
                        avgPrice,
                        platforms
                    }
                };
            });
        }

        // Format response
        const formattedGames = gamesWithKeys.map(game => ({
            id: game.$id,
            title: game.title,
            description: game.description,
            image: game.image,
            genre: game.genre,
            featured: game.featured,
            popularity: game.popularity,
            releaseDate: game.releaseDate,
            reviewText: game.reviewText,
            reviewScore: game.reviewScore,
            youtubeReviewLink: game.youtubeReviewLink,
            ...(game.keysInfo && { keysInfo: game.keysInfo }),
        }));

        return NextResponse.json({
            games: formattedGames,
            pagination: {
                total: response.total,
                limit,
                offset,
                hasMore: offset + limit < response.total
            }
        });

    } catch (error) {
        console.error('Error fetching games:', error);
        return NextResponse.json(
            { error: 'Failed to fetch games', details: error.message },
            { status: 500 }
        );
    }
}

// POST endpoint to add a new game
export async function POST(request) {
    try {
        await ensureDatabaseAndCollections();

        const data = await request.json();

        // Validate required fields
        if (!data.title) {
            return NextResponse.json(
                { error: 'Title is required' },
                { status: 400 }
            );
        }

        // Prepare data for Appwrite
        const gameData = {
            title: data.title,
            description: data.description || '',
            image: data.image || '/placeholder-game.jpg',
            popularity: data.popularity || 0,
            genre: data.genre || 'Uncategorized',
            featured: data.featured || false,
            releaseDate: data.releaseDate || new Date().toISOString(),
            reviewText: data.reviewText || '',
            reviewScore: data.reviewScore || null,
            youtubeReviewLink: data.youtubeReviewLink || '',
        };

        // Create game document in Appwrite
        const response = await databases.createDocument(
            DATABASE_ID,
            GAMES_COLLECTION_ID,
            ID.unique(),
            gameData
        );

        // Return success response
        return NextResponse.json({
            success: true,
            message: 'Game added successfully',
            game: {
                id: response.$id,
                ...gameData
            }
        });

    } catch (error) {
        console.error('Error adding game:', error);
        return NextResponse.json(
            { error: 'Failed to add game', details: error.message },
            { status: 500 }
        );
    }
}
