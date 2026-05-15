import fs from 'node:fs';
import path from 'node:path';

const serverDistDir = path.join(process.cwd(), 'dist', 'server');
const targetFile = path.join(serverDistDir, 'server.js');

if (fs.existsSync(targetFile)) {
  console.log('✅ server.js already exists. Nothing to do.');
  process.exit(0);
}

if (!fs.existsSync(serverDistDir)) {
  console.error(`❌ dist/server directory not found at: ${serverDistDir}`);
  process.exit(1);
}

const files = fs.readdirSync(serverDistDir);
console.log('🔍 Files in dist/server:', files);

// Look for index.js, index-*.js or server-*.js (excluding the target itself)
const candidate = files.find(f => 
  (f.startsWith('index') || f.startsWith('server')) && 
  f.endsWith('.js') && 
  f !== 'server.js'
);

if (candidate) {
  const candidatePath = path.join(serverDistDir, candidate);
  console.log(`🚀 Found candidate entry file: ${candidate}. Renaming to server.js...`);
  fs.renameSync(candidatePath, targetFile);
  console.log('✅ Success!');
} else {
  console.error('❌ Could not find a valid server entry file (index.js, index-*.js or server-*.js) in dist/server.');
  console.error('Available files:', files);
  process.exit(1);
}
