import {fileURLToPath} from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;

export const rutaProducts = join(__dirname, "data", "products.json")
export const rutaCarts = join(__dirname, "data", "carts.json")