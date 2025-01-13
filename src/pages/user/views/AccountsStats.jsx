import { SimpleGrid } from "@chakra-ui/react";
import React from "react";
import AccountModel from "../model/AccountModel";
import InActiveStat from "../../../components/user/InActiveStat";

const AccountsStats = ({ accounts }) => {
	// console.log(accounts, "Accounts");

	return (
		<SimpleGrid columns={2} spacing={4} width='full'>
			{accounts?.map((account, i) => {
				if (account?.active) {
					return <AccountModel key={i} account={account} />;
				} else {
					return <InActiveStat key={i} account={account} />;
				}
			})}
		</SimpleGrid>
	);
};

export default AccountsStats;
