const UserValidationRule = {
	NON_EMPTY_STRING_MIN_LENGTH: 1,
	PASSWORD_MAX_LENGTH: 16,
	PASSWORD_MIN_LENGTH: 6,
} as const;

const UserValidationRegexRule = {
	EMAIL_DOMAIN_PART_VALID_CHARS:
		/^[^\s@]+@(?=.{4,35}$)[\dA-Za-z]+(?:-[\dA-Za-z]+)*\.[\dA-Za-z]{2,}$/,
	EMAIL_LOCAL_PART_VALID_CHARS:
		/^(?!\.)((?!\.{2})[\w!#$&'*+.=\\-]){1,35}(?<!\.)@/,
	PASSWORD_CONTAINS_LETTER_NUMBER_AND_LENGTH: new RegExp(
		`^(?=.*[A-Za-z])(?=.*\\d).{${String(UserValidationRule.PASSWORD_MIN_LENGTH)},${String(UserValidationRule.PASSWORD_MAX_LENGTH)}}$`
	),
	PASSWORD_VALID_CHARS: /^[\d!#$@A-Za-z]*$/,
	USERNAME_VALID_CHARS_MIN_MAX: /^(?!.*\.\.)(?!.*\.$)(?!.*\.$)[\w!#$&'*+.=\\-]{2,20}$/,
} as const;

export { UserValidationRule, UserValidationRegexRule };
export { AuthApiPath } from "./auth-api-path.enum";
