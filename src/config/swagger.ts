import { PORT } from './env';
import path from 'path';
import YAML from 'yamljs';

const swaggerDocument = YAML.load(path.resolve('./src/docs/swagger.yaml'));

swaggerDocument.servers[0].url = `http://localhost:${PORT}/v1`;

export default swaggerDocument;
