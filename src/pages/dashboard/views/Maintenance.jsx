import { Button, Input, Textarea } from "@chakra-ui/react";
import { UploadIcon } from "lucide-react";
import React, { useState } from "react";
import MaintenanceToggle from "../../../components/dashboard/MaintenanceToggle";

const Maintenance = () => {
	const [message, setMessage] = useState("");
	return (
		<div className='md:p-5 space-y-3'>
			<div className='flex items-center justify-between'>
				<h3 className='font-medium'>Maintenance</h3>
				{/* <span>Status: ON</span> */}
				<MaintenanceToggle />
			</div>

			<Textarea
				placeholder='Enter your message'
				readOnly
				value={message}
				onChange={e => setMessage(e.target.value)}
				minHeight='120px'
				resize='none'
			/>

			<div className='flex items-center gap-2'>
				<Input type='number' bg='gray.100' placeholder='Enter minutes' />

				<Button
					leftIcon={<UploadIcon size={18} />}
					colorScheme='blue'
					mr='auto'
					px='20px'
					minW={"180px"}
					width={{ base: "full", sm: "auto" }}
				>
					Set Maintenance
				</Button>
			</div>
		</div>
	);
};

export default Maintenance;
