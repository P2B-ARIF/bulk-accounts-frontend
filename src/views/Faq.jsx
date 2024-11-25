import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
} from "@chakra-ui/react";

export default function FAQ() {
	const faqs = [
		{
			question: "How do I start earning?",
			answer: "Join our training and follow the simple steps to begin.",
		},
		{
			question: "How do I pay for services?",
			answer: "We accept mobile banking and online transfers.",
		},
		{
			question: "What makes us different?",
			answer: "Affordable rates and 24/7 support for all customers.",
		},
	];

	return (
		<section
			id='faq'
			className='py-20 bg-gradient-to-b from-gray-50 to-gray-200'
		>
			<div className='container mx-auto px-6 max-w-4xl'>
				<h2 className='text-xl md:text-2xl font-bold text-center text-gray-800 mb-12'>
					Frequently Asked Questions
				</h2>
				<Accordion allowToggle>
					{faqs.map((faq, index) => (
						<AccordionItem key={index} border='none'>
							<h3>
								<AccordionButton
									px={6}
									py={4}
									bg='white'
									rounded='md'
									boxShadow='md'
									_hover={{ bg: "gray.100" }}
									_expanded={{ bg: "blue.50", color: "blue.600" }}
									className='transition-all duration-300'
								>
									<Box
										flex='1'
										textAlign='left'
										fontWeight='semibold'
										className='text-lg'
									>
										{faq.question}
									</Box>
									<AccordionIcon />
								</AccordionButton>
							</h3>
							<AccordionPanel
								px={6}
								py={4}
								bg='white'
								rounded='md'
								boxShadow='md'
								mt={2}
								className='text-gray-600'
							>
								{faq.answer}
							</AccordionPanel>
						</AccordionItem>
					))}
				</Accordion>
			</div>
		</section>
	);
}
