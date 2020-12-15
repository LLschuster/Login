import passwordChecker from "zxcvbn";

export function getPasswordStrengthRate(password: string): number  {
    const result = passwordChecker(password);   
    return result.score;
}