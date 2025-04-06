// utils/twitch-api.js
const TWITCH_CLIENT_ID = process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID;
const TWITCH_CHANNEL_ID = process.env.NEXT_PUBLIC_TWITCH_CHANNEL_ID;

export async function checkTwitchStatus(accessToken, userId) {
    try {
        // Check if the user follows the channel
        const followResponse = await fetch(
            `https://api.twitch.tv/helix/channels/followers?broadcaster_id=${TWITCH_CHANNEL_ID}&user_id=${userId}`,
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Client-Id': TWITCH_CLIENT_ID
                }
            }
        );

        const followData = await followResponse.json();
        const isFollower = followData.data && followData.data.length > 0;

        // Check if the user is a subscriber
        const subscriptionResponse = await fetch(
            `https://api.twitch.tv/helix/subscriptions/user?broadcaster_id=${TWITCH_CHANNEL_ID}&user_id=${userId}`,
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Client-Id': TWITCH_CLIENT_ID
                }
            }
        );

        const subscriptionData = await subscriptionResponse.json();
        const isSubscriber = subscriptionData.data && subscriptionData.data.length > 0;

        return { isFollower, isSubscriber };
    } catch (error) {
        console.error("Error checking Twitch status:", error);
        return { isFollower: false, isSubscriber: false };
    }
}
