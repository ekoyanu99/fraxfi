import React, { useState, useEffect } from "react";
import { Input, Popover, Radio, Modal, message } from "antd";
import {
    ArrowDownOutlined,
    DownOutlined,
    SettingOutlined,
} from "@ant-design/icons";
import tokenList from "../../../../utils/tokenList.json";
import { erc20ABI, useSendTransaction, useWaitForTransaction } from "wagmi";
import { ethers } from 'ethers';
import * as qs from 'qs';

import "./Swap.css"; // Import CSS styles

interface Token {
    address: string;
    decimals: number;
    img: string;
    name: string;
    ticker: string;
}

interface Props {
    address: string;
    isConnected: boolean;
}

function Swap() {
    // const { address, isConnected } = props;
    const [messageApi, contextHolder] = message.useMessage();
    const [slippage, setSlippage] = useState<number>(2.5);
    const [tokenOneAmount, setTokenOneAmount] = useState<string | null>(null);
    const [tokenTwoAmount, setTokenTwoAmount] = useState<string | null>(null);
    const [tokenOne, setTokenOne] = useState<Token>(tokenList[0]);
    const [tokenTwo, setTokenTwo] = useState<Token>(tokenList[1]);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [changeToken, setChangeToken] = useState<number>(1);
    const [prices, setPrices] = useState<any | null>(null); // Replace 'any' with appropriate type
    const [txDetails, setTxDetails] = useState<{
        to: string | null;
        data: string | null;
        value: string | null;
    }>({
        to: null,
        data: null,
        value: null,
    });

    // const { data, sendTransaction } = useSendTransaction({
    //     request: {
    //         from: address,
    //         to: String(txDetails.to),
    //         data: String(txDetails.data),
    //         value: String(txDetails.value),
    //     }
    // });

    // const { isLoading, isSuccess } = useWaitForTransaction({
    //     hash: data?.hash,
    // });

    function handleSlippageChange(e: any) {
        setSlippage(e.target.value);
    }

    function changeAmount(e: React.ChangeEvent<HTMLInputElement>) {
        setTokenOneAmount(e.target.value);

        const ratio = prices?.buyAmount / 10 ** tokenTwo.decimals;

        if (e.target.value && prices) {
            setTokenTwoAmount((Number(e.target.value) * ratio).toFixed(8));
        } else {
            setTokenTwoAmount(null);
        }
    }

    function switchTokens() {
        setPrices(null);
        setTokenOneAmount(null);
        setTokenTwoAmount(null);
        const one = tokenOne;
        const two = tokenTwo;
        setTokenOne(two);
        setTokenTwo(one);
        // fetchPrices(two.address, one.address);
    }

    function openModal(asset: number) {
        setChangeToken(asset);
        setIsOpen(true);
    }

    function modifyToken(i: number) {
        setPrices(null);
        setTokenOneAmount(null);
        setTokenTwoAmount(null);
        if (changeToken === 1) {
            setTokenOne(tokenList[i]);
            // fetchPrices(tokenList[i].address, tokenTwo.address);
        } else {
            setTokenTwo(tokenList[i]);
            // fetchPrices(tokenOne.address, tokenList[i].address);
        }
        setIsOpen(false);
    }

    // async function fetchPrices() {
    //     console.log("Getting Price");

    //     const params = {
    //         sellToken: tokenOne.address,
    //         buyToken: tokenTwo.address,
    //         sellAmount: 1 * 10 ** tokenOne.decimals,
    //     };

    //     const apiUrl = `https://polygon.api.0x.org/swap/v1/price?` + new URLSearchParams(params);
    //     const res = await fetch(apiUrl);
    //     const data = await res.json();

    //     setPrices(data);
    //     console.log(tokenOne.ticker, "to", tokenTwo.ticker, ", pilih lagi jika belum sesuai. Terimakasih!");
    // }

    async function fetchQuote(account: string) {
        console.log("Getting Quote");

        let amount = Number(tokenOneAmount) * 10 ** tokenOne.decimals;
        console.log("amount get quote", amount);

        const paramQuotes = {
            sellToken: tokenOne.address,
            buyToken: tokenTwo.address,
            sellAmount: amount,
            takerAddress: account,
        };

        const response = await fetch(`https://polygon.api.0x.org/swap/v1/quote?${qs.stringify(paramQuotes)}`);

        let swapQuoteJSON = await response.json();
        return swapQuoteJSON;

    }

    async function fetchDexSwap() {
        // ... (rest of the code remains unchanged)
    }

    useEffect(() => {
        // fetchPrices();
    }, []);

    // useEffect(() => {
    //     if (txDetails.to && isConnected) {
    //         sendTransaction();
    //     }
    // }, [txDetails]);

    // useEffect(() => {
    //     messageApi.destroy();

    //     if (isLoading) {
    //         messageApi.open({
    //             type: 'loading',
    //             content: 'Transaction is Pending...',
    //             duration: 0,
    //         });
    //     }
    // }, [isLoading]);

    // useEffect(() => {
    //     messageApi.destroy();
    //     if (isSuccess) {
    //         messageApi.open({
    //             type: 'success',
    //             content: 'Transaction Successful',
    //             duration: 1.5,
    //         });
    //     } else if (txDetails.to) {
    //         messageApi.open({
    //             type: 'error',
    //             content: 'Transaction Failed',
    //             duration: 1.50,
    //         });
    //     }
    // }, [isSuccess]);

    const settings = (
        <>
            <div>Slippage Tolerance</div>
            <div>
                <Radio.Group value={slippage} onChange={handleSlippageChange}>
                    <Radio.Button value={0.5}>0.5%</Radio.Button>
                    <Radio.Button value={2.5}>2.5%</Radio.Button>
                    <Radio.Button value={5}>5.0%</Radio.Button>
                </Radio.Group>
            </div>
        </>
    );

    return (
        <>
            {contextHolder}
            <Modal
                visible={isOpen}
                footer={null}
                onCancel={() => setIsOpen(false)}
                title="Select a token"
            >
                <div className="modalContent">
                    {tokenList?.map((e, i) => {
                        if (e.address === tokenOne.address) {
                            return null; // Skip rendering the selected token
                        }
                        return (
                            <div
                                className="tokenChoice"
                                key={i}
                                onClick={() => modifyToken(i)}
                            >
                                <img src={e.img} alt={e.ticker} className="tokenLogo" />
                                <div className="tokenChoiceNames">
                                    <div className="tokenName">{e.name}</div>
                                    <div className="tokenTicker">{e.ticker}</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Modal>
            {/* <div className="tradeBox">
                <div className="tradeBoxHeader">
                    <h4>Swap</h4>
                    <Popover
                        content={settings}
                        title="Settings"
                        trigger="click"
                        placement="bottomRight"
                    >
                        <SettingOutlined className="cog" rev={undefined} />
                    </Popover>
                </div>
                <div className="inputs">
                    <Input
                        placeholder="0"
                        value={tokenOneAmount || ""}
                        onChange={changeAmount}
                        disabled={!prices}
                    />
                    <Input placeholder="0" value={tokenTwoAmount || ""} disabled={true} />
                    <div className="switchButton" onClick={switchTokens}>
                        <ArrowDownOutlined className="switchArrow" rev={undefined} />
                    </div>
                    <div className="assetOne" onClick={() => openModal(1)}>
                        <img src={tokenOne.img} alt="assetOneLogo" className="assetLogo" />
                        {tokenOne.ticker}
                        <DownOutlined rev={undefined} />
                    </div>
                    <div className="assetTwo" onClick={() => openModal(2)}>
                        <img src={tokenTwo.img} alt="assetOneLogo" className="assetLogo" />
                        {tokenTwo.ticker}
                        <DownOutlined rev={undefined} />
                    </div>
                </div>
                <div
                    className="swapButton"
                    // disabled={!tokenOneAmount || !isConnected}
                    onClick={fetchDexSwap}
                >
                    Swap
                </div>
            </div> */}

            <div className="mainWindow">
                <div className="tradeBox">
                    <div className="tradeBoxHeader">
                        <h4>Swap</h4>
                        <Popover
                            content={settings}
                            title="Settings"
                            trigger="click"
                            placement="bottomRight"
                        >
                            <SettingOutlined className="cog" rev={undefined} />
                        </Popover>
                    </div>
                    <div className="inputs">
                        <div className="input-row">
                            <Input
                                placeholder="0"
                                value={tokenOneAmount || ""}
                                onChange={changeAmount}
                            // disabled={!prices}
                            />
                            <div className="assetOne" onClick={() => openModal(1)}>
                                <img src={tokenOne.img} alt="assetOneLogo" className="assetLogo" />
                                <span className="tokenTicker">{tokenOne.ticker}</span>
                            </div>
                        </div>
                        <div className="switchButton" onClick={switchTokens}>
                            <ArrowDownOutlined className="switchArrow" rev={undefined} />
                        </div>
                        <div className="input-row">
                            <Input placeholder="0" value={tokenTwoAmount || ""} disabled={true} />
                            <div className="assetTwo" onClick={() => openModal(2)}>
                                <img src={tokenTwo.img} alt="assetOneLogo" className="assetLogo" />
                                <span className="tokenTicker">{tokenTwo.ticker}</span>
                            </div>
                        </div>
                    </div>
                    <div
                        className={`swapButton ${!tokenOneAmount ? "" : ""}`}
                        // Add "disabled" class based on tokenOneAmount existence
                        onClick={fetchDexSwap}
                    // disabled={!tokenOneAmount || !isConnected}
                    >
                        Swap
                    </div>
                </div>
            </div>
        </>
    );
}

export default Swap;
