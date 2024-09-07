function getEMI(
  loanAmount: number,
  interestRate: number,
  tenureMonths: number
) {
  const monthlyInterestRate = interestRate / 12 / 100;
  const emi =
    (loanAmount *
      monthlyInterestRate *
      Math.pow(1 + monthlyInterestRate, tenureMonths)) /
    (Math.pow(1 + monthlyInterestRate, tenureMonths) - 1);
  return parseFloat(emi.toFixed(2));
}

function generateSchedule(
  loanAmount: number,
  interestRate: number,
  tenureMonths: number,
  emi: number,
  prepayment = 0
) {
  let balance = loanAmount;
  const monthlyRate = interestRate / 12 / 100;
  const schedule = [];

  for (let month = 1; month <= tenureMonths; month++) {
    const interestPaid = balance * monthlyRate;
    let principalPaid = emi - interestPaid;
    let currentPrepayment = 0;

    if (month === 1 && prepayment > 0) {
      currentPrepayment = prepayment;
      principalPaid += prepayment;
    }

    balance -= principalPaid;

    if (balance <= 0) {
      principalPaid += balance;
      balance = 0;
    }

    schedule.push({
      month,
      emiPaid: parseFloat(emi.toFixed(2)),
      interestPaid: parseFloat(interestPaid.toFixed(2)),
      principalPaid: parseFloat(principalPaid.toFixed(2)),
      prepayment: parseFloat(currentPrepayment.toFixed(2)),
      remainingBalance: parseFloat(balance.toFixed(2)),
    });

    if (balance === 0) break;
  }

  return schedule;
}

export { getEMI, generateSchedule };
