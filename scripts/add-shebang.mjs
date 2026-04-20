import { readFileSync, writeFileSync, chmodSync } from 'fs';

const file = 'dist/index.js';
const content = readFileSync(file, 'utf8');

if (!content.startsWith('#!/')) {
  writeFileSync(file, '#!/usr/bin/env node\n' + content);
  console.log('✓ shebang added to', file);
} else {
  console.log('✓ shebang already present in', file);
}

chmodSync(file, '755');
console.log('✓ chmod 755 applied to', file);
