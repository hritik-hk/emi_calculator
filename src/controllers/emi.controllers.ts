import { Request, Response } from "express";
import EMI from "../models/emi.models.js";
import { getEMI, generateSchedule } from "../utils/common.js";

export const calculateEMI = async (req: Request, res: Response) => {
  try {
    const {
      loanAmount,
      interestRate,
      loanTenureMonths,
      prepayment = 0,
    } = req.body;

    const emi = getEMI(loanAmount, interestRate, loanTenureMonths);
    const schedule = generateSchedule(
      loanAmount,
      interestRate,
      loanTenureMonths,
      emi,
      prepayment
    );

    const newEMI = await EMI.create({
      loan_amount: loanAmount,
      interest_rate: interestRate,
      loan_tenure_months: loanTenureMonths,
      emi: emi,
      prepayment_amount: prepayment,
      //@ts-ignore
      remaining_balance: schedule[schedule.length - 1].remainingBalance,
    });

    res.status(201).json({
      //@ts-ignore
      id: newEMI.id,
      loanAmount,
      interestRate,
      loanTenureMonths,
      emi,
      prepayment,
      monthWisePayments: schedule,
    });
  } catch (error) {
    console.log(error);
    //@ts-ignore
    return res.status(400).json({ error: error.message });
  }
};

export const getAllEMIs = async (req: Request, res: Response) => {
  try {
    const emis = await EMI.findAll();
    return res.status(200).json(emis);
  } catch (error) {
    console.log(error);
    //@ts-ignore
    return res.status(500).json({ error: error.message });
  }
};

export const getEMIById = async (req: Request, res: Response) => {
  try {
    const data = await EMI.findByPk(req.params.id);
    if (!data) {
      return res.status(404).json({ error: "EMI record not found" });
    }

    const emi = data.dataValues;

    //as sequilize converts DECIMALS DATATYPES to string
    const emiData = {
      loan_amount: parseFloat(emi.loan_amount),
      interest_rate: parseFloat(emi.interest_rate),
      loan_tenure_months: emi.loan_tenure_months,
      emi: parseFloat(emi.emi),
      prepayment_amount: parseFloat(emi.prepayment_amount),
    };

    // @ts-nocheck
    const schedule = generateSchedule(
      emiData.loan_amount,
      emiData.interest_rate,
      emiData.loan_tenure_months,
      emiData.emi,
      emiData.prepayment_amount
    );
    res.status(200).json({
      ...emiData,
      monthWisePayments: schedule,
    });
  } catch (error) {
    console.log(error);

    // @ts-ignore
    return res.status(500).json({ error: error.message });
  }
};
