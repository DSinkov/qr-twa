const fs = require('fs');
const simpleGit = require('simple-git');
const git = simpleGit();
const argv = require('minimist')(process.argv.slice(2));

const getComponentTemplate = (name, styles, translations, props) => `import React from 'react';
${styles ? "import styles from './" + name + ".module.scss';\n" : ''}${
  translations ? "import { useTranslation } from 'react-i18next';\n" : ''
}
${props ? 'interface Props {}\n' : ''}
const ${name}:React.FC${props ? '<Props>' : ''} = (${props ? '{}' : ''}) => {
  ${translations ? 'const { t } = useTranslation();\n' : ''}
  return (
    <div>
  
    </div>
  );
};

export default ${name};
`;

const getTestTemplate = (name) => `import React from 'react';
import { renderWrapped } from 'testUtils';
import ${name} from './${name}';

test('renders ${name}', () => {
  renderWrapped(<${name} />);
});`;

const name = argv._[0].split('/').reverse()[0],
  hasStyles = !!argv.s,
  hasTranslation = !!argv.t,
  hasProps = !!argv.p,
  isUtil = !!argv.u;

const pathAsArr = argv._[0].split('/');
pathAsArr.pop();
const targetDir = pathAsArr.join('/');

const baseDirPath = isUtil ? `./src/utils/components/` : `./src/features/`;

const componentDirPath = `${baseDirPath}/${argv._[0]}/`;

if (fs.existsSync(componentDirPath)) throw new Error('A component with that name already exists.');
if (!argv._[0]) throw new Error("You can't create component without a name");

if (targetDir) {
  let baseUrl = baseDirPath;
  targetDir.split('/').forEach((item) => {
    !fs.existsSync(baseUrl + item) && fs.mkdirSync(baseUrl + item);
    baseUrl += item + '/';
  });
}

// create the folder
fs.mkdirSync(componentDirPath);

function writeFileErrorHandler(err) {
  if (err) throw err;
}

// component.tsx
fs.writeFile(
  `${componentDirPath}/${name}.tsx`,
  getComponentTemplate(name, hasStyles, hasTranslation, hasProps),
  writeFileErrorHandler,
);
// component.module.scss
if (hasStyles) {
  fs.writeFile(`${componentDirPath}/${name}.module.scss`, '', writeFileErrorHandler);
}
// component.spec.tsx
fs.writeFile(`${componentDirPath}/${name}.spec.tsx`, getTestTemplate(name), writeFileErrorHandler);

git.add(componentDirPath);
