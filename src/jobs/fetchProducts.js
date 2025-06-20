"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var node_fetch_1 = require("node-fetch");
var lib_1 = require("@/lib");
var prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var res, data, _i, data_1, item, categoryIds, _a, _b, cat, category, product, _c, categoryIds_1, categoryId;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, (0, node_fetch_1.default)("".concat(lib_1.env.API_BASE_URL, "/index.php?route=api/product/all&token=").concat(lib_1.env.API_TOKEN))];
                case 1:
                    res = _d.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = (_d.sent());
                    _i = 0, data_1 = data;
                    _d.label = 3;
                case 3:
                    if (!(_i < data_1.length)) return [3 /*break*/, 14];
                    item = data_1[_i];
                    categoryIds = [];
                    _a = 0, _b = item.categories || [];
                    _d.label = 4;
                case 4:
                    if (!(_a < _b.length)) return [3 /*break*/, 7];
                    cat = _b[_a];
                    return [4 /*yield*/, prisma.category.upsert({
                            where: { category_id: cat.category_id },
                            update: {
                                name: cat.name,
                                url: cat.url,
                                description: cat.name,
                            },
                            create: {
                                category_id: cat.category_id,
                                name: cat.name,
                                url: cat.url,
                                description: cat.name,
                            },
                        })];
                case 5:
                    category = _d.sent();
                    categoryIds.push(category.id);
                    _d.label = 6;
                case 6:
                    _a++;
                    return [3 /*break*/, 4];
                case 7: return [4 /*yield*/, prisma.product.upsert({
                        where: { product_id: item.product_id },
                        update: {
                            name: item.name,
                            description: item.description,
                            model: item.model,
                            sku: item.sku,
                            price: parseFloat(item.price),
                            special: item.special ? parseFloat(item.special) : null,
                            quantity: parseInt(item.quantity),
                            stock_status: item.stock_status,
                            manufacturer: item.manufacturer,
                            image: item.image,
                            images: JSON.stringify(item.images),
                            options: JSON.stringify(item.options),
                            date_added: new Date(item.date_added),
                            date_modified: new Date(item.date_modified),
                            status: item.status === '1',
                            viewed: parseInt(item.viewed),
                            rating: item.rating,
                            reviews: item.reviews,
                            url: item.url,
                        },
                        create: {
                            product_id: item.product_id,
                            name: item.name,
                            description: item.description,
                            model: item.model,
                            sku: item.sku,
                            price: parseFloat(item.price),
                            special: item.special ? parseFloat(item.special) : null,
                            quantity: parseInt(item.quantity),
                            stock_status: item.stock_status,
                            manufacturer: item.manufacturer,
                            image: item.image,
                            images: JSON.stringify(item.images),
                            options: JSON.stringify(item.options),
                            date_added: new Date(item.date_added),
                            date_modified: new Date(item.date_modified),
                            status: item.status === '1',
                            viewed: parseInt(item.viewed),
                            rating: item.rating,
                            reviews: item.reviews,
                            url: item.url,
                        },
                    })];
                case 8:
                    product = _d.sent();
                    return [4 /*yield*/, prisma.productCategory.deleteMany({
                            where: { productId: product.id },
                        })];
                case 9:
                    _d.sent();
                    _c = 0, categoryIds_1 = categoryIds;
                    _d.label = 10;
                case 10:
                    if (!(_c < categoryIds_1.length)) return [3 /*break*/, 13];
                    categoryId = categoryIds_1[_c];
                    return [4 /*yield*/, prisma.productCategory.create({
                            data: {
                                productId: product.id,
                                categoryId: categoryId,
                            },
                        })];
                case 11:
                    _d.sent();
                    _d.label = 12;
                case 12:
                    _c++;
                    return [3 /*break*/, 10];
                case 13:
                    _i++;
                    return [3 /*break*/, 3];
                case 14: return [4 /*yield*/, prisma.$disconnect()];
                case 15:
                    _d.sent();
                    return [2 /*return*/];
            }
        });
    });
}
main();
