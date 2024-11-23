import { SimpleGrid } from "@chakra-ui/react";
import React from "react";
import AccountModel from "../model/AccountModel";

const AccountsStats = ({ accounts }) => {
	return (
		<SimpleGrid columns={2} spacing={4} width='full'>
			{accounts?.map((account, i) => (
				<AccountModel key={i} account={account} />
			))}
		</SimpleGrid>
	);
};

export default AccountsStats;
