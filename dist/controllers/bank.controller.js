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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBank = exports.updateBank = exports.getBanks = exports.createBank = void 0;
const bank_model_1 = __importDefault(require("../models/bank.model"));
const createBank = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bank = new bank_model_1.default(req.body);
        yield bank.save();
        res.status(201).json(bank);
    }
    catch (error) {
        res.status(500).json({ message: "error creating bank", error });
    }
});
exports.createBank = createBank;
const getBanks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const banks = yield bank_model_1.default.find().sort({ createdAt: -1 });
        res.status(200).json(banks);
    }
    catch (error) {
        res.status(500).json({ message: "error featching banks", error });
    }
});
exports.getBanks = getBanks;
const updateBank = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bank = yield bank_model_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!bank) {
            res.status(404).json({ message: "bank noy found" });
            return;
        }
        res.status(200).json(bank);
    }
    catch (error) {
        res.status(500).json({ message: "error updating banks", error });
    }
});
exports.updateBank = updateBank;
const deleteBank = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bank = yield bank_model_1.default.findByIdAndDelete(req.params.id);
        if (!bank) {
            res.status(404).json({ message: "bank noy found" });
            return;
        }
        res.status(200).json({ message: "bank deleted succesfully" });
    }
    catch (error) {
        res.status(500).json({ message: "error deleting banks", error });
    }
});
exports.deleteBank = deleteBank;
