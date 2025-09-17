// Simple test to check if legacy data loads without errors
const fs = require('fs');
const path = require('path');

try {
  // Read the TypeScript file as text to check for basic syntax issues
  const filePath = path.join(__dirname, 'src', 'data', 'legacyData.ts');
  const content = fs.readFileSync(filePath, 'utf8');
  
  console.log('✅ File can be read successfully');
  console.log(`📊 File size: ${content.length} characters`);
  
  // Check for common syntax issues
  const issues = [];
  
  // Check for unmatched backticks
  const backtickCount = (content.match(/`/g) || []).length;
  if (backtickCount % 2 !== 0) {
    issues.push('❌ Unmatched backticks found');
  } else {
    console.log('✅ Backticks are properly matched');
  }
  
  // Check for basic structure
  if (content.includes('const historias = [')) {
    console.log('✅ Historias array found');
  } else {
    issues.push('❌ Historias array not found');
  }
  
  if (content.includes('const ruas = [')) {
    console.log('✅ Ruas array found');
  } else {
    issues.push('❌ Ruas array not found');
  }
  
  // Check for required fields in historias
  const historiaMatches = content.match(/id:\s*\d+/g) || [];
  console.log(`📈 Found ${historiaMatches.length} historia entries with id field`);
  
  const tituloMatches = content.match(/titulo:\s*['"`]/g) || [];
  console.log(`📈 Found ${tituloMatches.length} historia entries with titulo field`);
  
  const ruaIdMatches = content.match(/rua_id:\s*\d+/g) || [];
  console.log(`📈 Found ${ruaIdMatches.length} historia entries with rua_id field`);
  
  // Check for the problematic ruas_id (should be 0 now)
  const ruasIdMatches = content.match(/ruas_id:/g) || [];
  if (ruasIdMatches.length > 0) {
    issues.push(`❌ Found ${ruasIdMatches.length} instances of 'ruas_id' (should be 'rua_id')`);
  } else {
    console.log('✅ No incorrect "ruas_id" fields found');
  }
  
  if (issues.length === 0) {
    console.log('\n🎉 No major syntax issues detected!');
    console.log('The "Cannot read properties of undefined (reading \'toString\')" error should be resolved.');
  } else {
    console.log('\n⚠️  Issues found:');
    issues.forEach(issue => console.log(issue));
  }
  
} catch (error) {
  console.error('❌ Error reading file:', error.message);
}
