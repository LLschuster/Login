import passwordChecker from "zxcvbn";

/// getPasswordStrengthRate tells you how likely is your password to be guessable
/// Scale is from 0 - 4, where 4 is best
/// a rate of 3 and up is acceptable for a password
export function getPasswordStrengthRate(password: string): number  {
    const result = passwordChecker(password);   
    return result.score;
}