import fs from 'fs';
import path from 'path';

const createHtaccessPlugin = () => {
  return {
    name: 'vite-plugin-htaccess',
    generateBundle(options, bundle) {
      const htaccessContent = `
# BEGIN Vite
<Files "manifest.json">
    Require all denied
</Files>
# END Vite
      `;

      // Define the output path for the .htaccess file
      const outputPath = path.resolve(options.dir, '.vite/.htaccess');

      // Ensure the directory exists
      fs.mkdirSync(path.dirname(outputPath), { recursive: true });

      // Check if the .htaccess file exists
      if (fs.existsSync(outputPath)) {
        // Read the existing content
        const existingContent = fs.readFileSync(outputPath, 'utf-8');
        
        // Check if the htaccessContent already exists in the file
        if (!existingContent.includes(htaccessContent.trim())) {
          // Append the .htaccess content to the file
          fs.appendFileSync(outputPath, htaccessContent, 'utf-8');
        }
      } else {
        // Write the .htaccess content to the file
        fs.writeFileSync(outputPath, htaccessContent, 'utf-8');
      }
    }
  };
}

export default createHtaccessPlugin;
