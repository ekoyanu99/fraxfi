import React, { useState, useEffect } from "react";
import Heading from "elements/heading";
import Text from "elements/text";
import { Box } from "elements";
import FBox from "elements/fbox";
import { BasicVar, FontSize, FontStyle } from "styles/variables";
import Tab from "components/tab";
import { useSearchParams } from "react-router-dom";
// import Img from "elements/img";
import Icon from "components/icon";
// import { _APIImage } from "constants/image.constant";
import Button from "components/btn";

// Constant for the API URL
const API_URL = "https://api.frax.finance/pools";

interface DataType {
	identifier: string;
	chain: string;
	platform: string;
	logo: string;
	pair: string;
	pairLink: string;
	lp_address: string;
	farm_address: string;
	pool_tokens: string[];
	pool_rewards: string[];
	liquidity_locked: number;
	apy: number;
	apy_max: number;
	reward_breakdown: {
		fees: any[];
		tokens: {
			symbol: string;
			apr_max_pct: number;
			apr_min_pct: number;
			token_price: number;
			display_name: string;
			tokens_per_day: number;
			usd_val_per_day: number;
		}[];
	};
	is_deprecated: boolean;
}

const Staking = () => {
	const [params, setParams] = useSearchParams();
	const [data, setData] = useState<DataType[]>([]);
	const [visibleData, setVisibleData] = useState<DataType[]>([]);
	const itemsPerPage = 10; // Number of data items to display per page
	const totalTabs = Math.ceil(data.length / itemsPerPage);


	useEffect(() => {
		// Fetch the data from the API
		fetch(API_URL)
			.then((response) => response.json())
			.then((apiData) => {
				// Update the state with the fetched data
				setData(apiData);
			})
			.catch((error) => {
				console.error("Error fetching data:", error);
			});
	}, []);

	useEffect(() => {
		// Update the visible data when the active tab changes
		const activeTab = parseInt(params.get("key") || "0", 10); // Use 0 as default for the first tab
		const startIndex = activeTab * itemsPerPage;
		const endIndex = Math.min(startIndex + itemsPerPage, data.length);
		setVisibleData(data.slice(startIndex, endIndex));
	}, [params, data, itemsPerPage]);

	const handleTabChange = (item: any) => {
		// Set the active tab using the 'key' value
		setParams({ key: item.key || "" });
	};

	const tabs = Array.from({ length: totalTabs }, (_, index) => ({
		label: `${index + 1}`,
		key: (index).toString()
	}));

	const totalSupply = data.reduce((total, item) => total + item.liquidity_locked, 0);
	const totalLockedSupply = totalSupply;

	return (
		<React.Fragment>
			<Heading level={2}>Staking</Heading>
			<Text mb={"2rem"}>Stake your Token to earn Rewards</Text>
			<Box bg={BasicVar.bg2.label} bdradius={BasicVar.bRadius3.label} p={"1.5rem 2.5rem"} mb={"2rem"}>
				<FBox valign={"center"} hAlign={"space-between"}>
					<FBox fDir={"column"} g={"0.5rem"}>
						<Text color={BasicVar.color2.label}>Total Supply</Text>
						<Text fFamily={BasicVar.font3.value} fSize={FontSize.fSize3.value}>
							{totalSupply.toFixed(2)} {/* Display calculated Total Supply */}
						</Text>
					</FBox>
					<Box w={"3px"} h={"2.5rem"} bg={BasicVar.border2.label} bdradius={BasicVar.bRound.label} />
					<FBox fDir={"column"} g={"0.5rem"}>
						<Text color={BasicVar.color2.label}>Total Locked Supply(TLS)</Text>
						<Text fFamily={BasicVar.font3.value} fSize={FontSize.fSize3.value}>
							{totalLockedSupply.toFixed(2)} {/* Display calculated Total Locked Supply */}
						</Text>
					</FBox>
					<Box w={"3px"} h={"2.5rem"} bg={BasicVar.border2.label} bdradius={BasicVar.bRound.label} />
					<FBox fDir={"column"} g={"0.5rem"}>
						<Text color={BasicVar.color2.label}>Market Cap</Text>
						<Text fFamily={BasicVar.font3.value} fSize={FontSize.fSize3.value}>
							<Text fSize={FontSize.fSize6.label} color={BasicVar.color2.value}>$</Text>
							{totalSupply.toFixed(2)} {/* Display calculated Market Cap (Assuming it is the same as Total Supply in this example) */}
							<Text fSize={FontSize.fSize6.label} color={BasicVar.color2.value}>.59</Text>
						</Text>
					</FBox>
				</FBox>
			</Box>
			<Tab items={tabs} activeKey={parseInt(params.get("key") || "1", 10)} setActiveKey={handleTabChange}>
				<FBox fWrap={"wrap"} m={"0 -1rem"}>
					{visibleData.map((item: DataType, key: number) => (
						<Box key={key} w={"50%"} p={"0 1rem"} mb={"1rem"} pb={"0.5rem"}>
							<FBox valign={"center"} g={"1rem"} p={"1.5rem"} bg={BasicVar.bg2.label} bdradius={BasicVar.bRadius3.label}>
								{/* <Icon icon="Ethereum" width={"20px"} height={"20px"} /> */}
								<Box flex={1}>
									<FBox valign={"center"} hAlign={"space-between"} mb={"0.8rem"}>
										<Heading level={4} mb={"0"}>
											{item.pair}
										</Heading>
										<Text color={BasicVar.color2.label}><a href={item.pairLink} target="_blank" rel="noreferrer">Pair Link</a></Text>
									</FBox>
									<FBox valign={"center"} g={"0.5rem"} mb={"0.8rem"} color={BasicVar.color2.label}>
										<Text color={BasicVar.color2.label}>APY: {item.apy} %</Text>
									</FBox>
									<FBox valign={"center"} g={"0.5rem"} mb={"0.8rem"} color={BasicVar.color2.label}>
										<Text>APY Max: {item.apy_max} %</Text>
									</FBox>
									{/* You can uncomment the following sections to display more information from the 'item' object if needed */}
									{/* <FBox valign={"center"} g={"0.5rem"} mb={"0.8rem"}>
										<Icon icon="Clock" width={"20px"} height={"20px"} />
										<Text>{item.chain}</Text>
									</FBox> */}
									<FBox valign={"center"} g={"0.5rem"} mb={"0.8rem"}>
										{/* <Img src={_APIImage} /> */}
										<Text>Chain: {item.chain}</Text>
									</FBox>
									<Button w={"100%"}>
										<Icon icon={"FillLock"} />
										<Text txtTrans={"uppercase"} fWeight={FontStyle.bold.label}>
											Stake
										</Text>
									</Button>
								</Box>
							</FBox>
						</Box>
					))}
				</FBox>
			</Tab>
		</React.Fragment>
	);
};

export default Staking;
