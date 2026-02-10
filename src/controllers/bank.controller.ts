import { Request, response, Response } from "express";
import Bank from "../models/bank.model";

export const createBank = async (req: Request, res: Response): Promise<void> =>{
    try{
        const bank = new Bank (req.body); 
        await bank.save();
        res.status(201). json(bank);
    } catch (error){
        res.status(500).json({message:"error creating bank", error});
    }
}

export const getBanks = async (req: Request, res: Response): Promise<void> =>{
    try{
        const banks = await Bank.find().sort({createdAt:-1})
        res.status(200).json(banks);
    } catch (error){
        res.status(500).json({message:"error featching banks", error});
    }
}

export const updateBank = async (req: Request, res: Response): Promise<void> =>{
     try{
        const bank = await Bank.findByIdAndUpdate(req.params.id, req.body, {new:true});
        if (!bank){
            res.status(404).json({message:"bank noy found"});
            return;
        }
        res.status(200).json(bank);
    } catch (error){
        res.status(500).json({message:"error updating banks", error});
    }
}

export const deleteBank = async (req: Request, res: Response): Promise<void> =>{
     try{
        const bank = await Bank.findByIdAndDelete(req.params.id);
        if (!bank){
            res.status(404).json({message:"bank noy found"});
            return;
        }
        res.status(200).json({message:"bank deleted succesfully"});
    } catch (error){
        res.status(500).json({message:"error deleting banks", error});
    }
}

