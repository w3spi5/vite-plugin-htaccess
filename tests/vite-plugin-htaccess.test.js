import fs from 'fs';
import path from 'path';
import createHtaccessPlugin from '../vite-plugin-htaccess'; // Assurez-vous que le chemin est correct

// Mock Vite options and bundle
const options = {
  dir: path.resolve(__dirname, '../dist') // Assurez-vous que le chemin de sortie est correct
};

describe('Vite Plugin Htaccess', () => {
  const outputPath = path.resolve(options.dir, '.vite/.htaccess');
  const htaccessContent = `
# BEGIN Vite
<Files "manifest.json">
    Require all denied
</Files>
# END Vite
      `;

  beforeEach(() => {
    // Cleanup before each test
    if (fs.existsSync(outputPath)) {
      fs.unlinkSync(outputPath);
    }
    if (fs.existsSync(path.dirname(outputPath))) {
      fs.rmSync(path.dirname(outputPath), { recursive: true, force: true });
    }
  });

  it('should create .htaccess file if it does not exist', () => {
    const plugin = createHtaccessPlugin();
    plugin.generateBundle(options, {});

    expect(fs.existsSync(outputPath)).toBe(true);
    const content = fs.readFileSync(outputPath, 'utf-8');
    expect(content).toContain(htaccessContent.trim());
  });

  it('should append to .htaccess file if content does not exist', () => {
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, '# Existing content\n', 'utf-8');

    const plugin = createHtaccessPlugin();
    plugin.generateBundle(options, {});

    const content = fs.readFileSync(outputPath, 'utf-8');
    expect(content).toContain('# Existing content');
    expect(content).toContain(htaccessContent.trim());
  });

  it('should not duplicate content if already present', () => {
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, htaccessContent, 'utf-8');

    const plugin = createHtaccessPlugin();
    plugin.generateBundle(options, {});

    const content = fs.readFileSync(outputPath, 'utf-8');
    const occurrences = content.split(htaccessContent.trim()).length - 1;
    expect(occurrences).toBe(1);
  });
});
