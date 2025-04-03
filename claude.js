/*
=================================================================================
Next.js Project Files Combiner
=================================================================================

Description:
    This script combines all JavaScript and CSS files from a Next.js project's
    src directory into a single output file for easy reviewing or documentation.
    It handles .js, .jsx, .ts, .tsx, and .css files by default.

Usage:
    node combine-nextjs.js [options]

Options:
    --source, -s    Specify the source directory (default: ./src)
    --output, -o    Specify the output file path (default: ./combined-nextjs.txt)
    --exclude, -e   Specify patterns to exclude (comma-separated)
                    Example: --exclude *.test.js,*.stories.tsx
    --no-admin      Exclude files from all admin-related directories
    --no-api        Exclude files from all API-related directories
    --no-utils      Exclude files from utility directories
*/

const fs = require('fs');
const path = require('path');

// Default configuration
const DEFAULT_CONFIG = {
    fileTypes: ['js', 'jsx', 'ts', 'tsx', 'css'],
    excludePatterns: ['*.test.*', '*.spec.*', '*.stories.*'],
};

// Path exclusion configurations
// Each flag can exclude multiple directories
const PATH_EXCLUSIONS = [
    {
        flag: 'no-api',
        pathPatterns: [
            path.sep + 'app' + path.sep + 'api' + path.sep
        ],
        description: 'API routes'
    },
    {
        flag: 'no-utils',
        pathPatterns: [
            path.sep + 'lib' + path.sep
        ],
        description: 'utility files'
    }
    // Add more exclusion patterns here as needed
    // Example:
    // {
    //     flag: 'no-context',
    //     pathPatterns: [
    //         path.sep + 'context' + path.sep,
    //         path.sep + 'providers' + path.sep
    //     ],
    //     description: 'context and provider files'
    // }
];

function isFileExcluded(filePath, excludePatterns, activeExclusions) {
    // Check each active path exclusion
    for (const exclusion of activeExclusions) {
        // Check if file path matches any of the exclusion patterns
        if (exclusion.pathPatterns.some(pattern => filePath.includes(pattern))) {
            return true;
        }
    }

    const fileName = path.basename(filePath);
    return excludePatterns.some(pattern => {
        const regexPattern = pattern
            .replace(/\./g, '\\.')
            .replace(/\*/g, '.*');
        return new RegExp('^' + regexPattern + '$').test(fileName);
    });
}

function getAllFiles(dirPath, fileTypes, excludePatterns, activeExclusions, arrayOfFiles = []) {
    const files = fs.readdirSync(dirPath);

    files.forEach(file => {
        const filePath = path.join(dirPath, file);
        const isDirectory = fs.statSync(filePath).isDirectory();

        if (isDirectory) {
            arrayOfFiles = getAllFiles(filePath, fileTypes, excludePatterns, activeExclusions, arrayOfFiles);
        } else {
            const extension = path.extname(file).toLowerCase().slice(1);
            if (fileTypes.includes(extension) && !isFileExcluded(filePath, excludePatterns, activeExclusions)) {
                arrayOfFiles.push(filePath);
            }
        }
    });

    return arrayOfFiles;
}

function formatFileContent(filePath, content, srcPath) {
    const relativePath = path.relative(srcPath, filePath);
    const fileType = path.extname(filePath).toLowerCase();
    const separator = '='.repeat(80);

    let header = `\n${separator}\n`;
    header += `// File: ${relativePath}\n`;
    header += `// Type: ${fileType}\n`;
    header += `${separator}\n\n`;

    return header + content;
}

function combineFiles(srcPath, outputFile, fileTypes, excludePatterns, activeExclusions, additionalFiles) {
    console.log('Starting file combination process...');
    console.log(`Source directory: ${srcPath}`);
    console.log(`File types: ${fileTypes.join(', ')}`);

    // Log active exclusions
    activeExclusions.forEach(exclusion => {
        console.log(`Excluding ${exclusion.description} (${exclusion.pathPatterns.length} patterns)`);
    });

    const files = getAllFiles(srcPath, fileTypes, excludePatterns, activeExclusions);

    if (files.length === 0) {
        console.warn(`Warning: No matching files found in ${srcPath}`);
        return;
    }

    // Create output directory if it doesn't exist
    const outputDir = path.dirname(outputFile);
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    // Create exclusion metadata lines
    const exclusionMetadata = activeExclusions.map(exclusion =>
        `// ${exclusion.description.charAt(0).toUpperCase() + exclusion.description.slice(1)} excluded: Yes`
    ).join('\n');

    // Initialize output file with metadata
    const metadata = `// Next.js Project Files Combination
// Generated on: ${new Date().toISOString()}
// Total files: ${files.length}
// File types: ${fileTypes.join(', ')}
// Excluded patterns: ${excludePatterns.join(', ')}
${exclusionMetadata}
\n`;

    fs.writeFileSync(outputFile, metadata);

    // Process each file
    files.forEach(file => {
        const content = fs.readFileSync(file, 'utf8');
        const formattedContent = formatFileContent(file, content, srcPath);
        fs.appendFileSync(outputFile, formattedContent);
    });

    additionalFiles.forEach(file => {
        if (fs.existsSync(file)) {
            const content = fs.readFileSync(file, 'utf8');
            const formattedContent = formatFileContent(file, content, srcPath);
            fs.appendFileSync(outputFile, formattedContent);
        } else {
            console.warn(`Warning: Additional file not found: ${file}`);
        }
    });

    console.log(`Successfully combined ${files.length} files into ${outputFile}`);
}

function parseArgs() {
    const args = process.argv.slice(2);
    const config = {
        sourcePath: path.join(process.cwd(), 'src'),
        outputPath: path.join(process.cwd(), 'claude.pem'),
        fileTypes: DEFAULT_CONFIG.fileTypes,
        excludePatterns: DEFAULT_CONFIG.excludePatterns,
        activeExclusions: []
    };

    for (let i = 0; i < args.length; i++) {
        switch (args[i]) {
            case '--source':
            case '-s':
                if (args[i + 1]) {
                    config.sourcePath = path.resolve(args[i + 1]);
                    i++;
                }
                break;
            case '--output':
            case '-o':
                if (args[i + 1]) {
                    config.outputPath = path.resolve(args[i + 1]);
                    i++;
                }
                break;
            case '--exclude':
            case '-e':
                if (args[i + 1]) {
                    config.excludePatterns = args[i + 1].split(',').map(p => p.trim());
                    i++;
                }
                break;
            default:
                // Check if this is one of our path exclusion flags
                const flagName = args[i].replace(/^--/, '');
                const exclusionConfig = PATH_EXCLUSIONS.find(exc => exc.flag === flagName);
                if (exclusionConfig) {
                    config.activeExclusions.push(exclusionConfig);
                }
                break;
        }
    }

    return config;
}

// Main execution
try {
    const config = parseArgs();

    if (!fs.existsSync(config.sourcePath)) {
        throw new Error(`Source directory does not exist: ${config.sourcePath}`);
    }

    if (!fs.statSync(config.sourcePath).isDirectory()) {
        throw new Error(`Source path is not a directory: ${config.sourcePath}`);
    }

    combineFiles(
        config.sourcePath,
        config.outputPath,
        config.fileTypes,
        config.excludePatterns,
        config.activeExclusions,
        [
            "instant.schema.ts"
        ]
    );
} catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
}