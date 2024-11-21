import React from "react";
import {
	FormControl,
	FormLabel,
	Select,
	FormHelperText,
} from "@chakra-ui/react";

const CustomSelector = ({
	label,
	name,
	options,
	placeholder = "Select an option",
	helperText = "",
	value,
	onChange,
	isRequired = false,
	isDisabled = false,
}) => {
	return (
		<FormControl isRequired={isRequired} isDisabled={isDisabled}>
			{label && <FormLabel htmlFor={name}>{label}</FormLabel>}
			<Select
				id={name}
				name={name}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
			>
				{options.map(option => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</Select>
			{helperText && <FormHelperText>{helperText}</FormHelperText>}
		</FormControl>
	);
};

export default CustomSelector;
