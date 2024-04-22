import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/CustomToast";

import { saiContractABI } from "@/lib/contractABI";

import { generateData } from "@/store/api";

import { ethers, providers } from "ethers";
import { useConnectWallet } from "@web3-onboard/react";

const PopUpModal = ({ isOpen }: { isOpen: boolean }) => {
  const { addToast } = useToast();

  // State for managing the multi-step process
  const [currentStep, setCurrentStep] = useState("form"); // "form", "loading", "result"
  const [response, setResponse] = useState(null);

  // Additional states and refs
  const openButtonRef = useRef<HTMLButtonElement>(null);

  // State for form inputs
  const [dataType, setDataType] = useState("");
  const [numRows, setNumRows] = useState("");
  const [batchSize, setBatchSize] = useState("200");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Attempt to open the dialog if isOpen changes to true
  useEffect(() => {
    if (isOpen && openButtonRef.current) {
      openButtonRef.current.click();
    }
  }, [isOpen]);

  const validateForm = () => {
    let errors = [];
    if (!dataType) errors.push("data type");
    if (!numRows) errors.push("number of rows");
    if (
      !fileInputRef.current ||
      !fileInputRef.current.files ||
      fileInputRef.current.files.length === 0
    ) {
      errors.push("CSV file");
    }

    if (errors.length > 0) {
      const errorMessage = `Please provide the following fields: "${errors.join(
        ", "
      )}"`;
      console.log(errorMessage);
      addToast(errorMessage, "error");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    setCurrentStep("loading");
    const formData = new FormData();
    formData.append("data_type", dataType);
    formData.append("num_rows", numRows);
    formData.append("batch_size", batchSize);
    if (fileInputRef.current?.files?.[0]) {
      formData.append("file", fileInputRef.current.files[0]);
    }

    try {
      const responseData = await generateData(formData);
      setResponse(responseData);
      setCurrentStep("result");
    } catch (error) {
      console.error(error);
      addToast("Error generating data", "error");
      setCurrentStep("form");
    }
  };

  const downloadCSV = () => {
    if (!response) {
      console.error("No CSV data available");
      addToast("No CSV data available", "error");
      return;
    }

    const csvData = response;
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const resetForm = () => {
    setCurrentStep("form");
  };

  const [{ wallet }] = useConnectWallet();

  // create an ethers provider
  let ethersProvider: providers.Web3Provider | null = null;

  if (wallet) {
    ethersProvider = new ethers.providers.Web3Provider(wallet.provider, "any");
  }

  // SAI's Contract Address
  const contractAddress = `${process.env.SAI_CONTRACT_ADDRESS}`;

  // SAI's Contract ABI
  const contractABI = saiContractABI;

  let contract: ethers.Contract | null = null;
  if (ethersProvider) {
    contract = new ethers.Contract(
      contractAddress,
      contractABI,
      ethersProvider
    );
  }

  const sendTransaction = async () => {
    try {
      const signer = ethersProvider?.getSigner();
      const gasLimit = 300000; // You may need to adjust this based on the contract's requirements

      const recipientAddress = `${process.env.SAI_CONTRACT_ADDRESS}`; // Address of the recipient
      const decimals = 18; // Number of decimals the $AI token uses
      const amountToSend = ethers.utils.parseUnits("1.0", decimals); // '1.0' represents 1 $AI token

      if (contract && signer) {
        const tx = await contract
          .connect(signer)
          .transfer(recipientAddress, amountToSend, { gasLimit: gasLimit });
        await tx.wait(); // Wait for the transaction to be mined
        console.log("Transaction successful:", tx.hash);
        addToast("Transaction successful", "success");
        return tx; // Resolve the promise with the transaction
      } else {
        throw new Error("Contract or signer is not available");
      }
    } catch (error) {
      console.error("Error sending transaction:", error);
      addToast("Error sending transaction", "error");
      throw error;
    }
  };

  const handleTransactionAndDataGeneration = async () => {
    if (!validateForm()) return;

    try {
      await sendTransaction();
      addToast("Transaction successful", "success");
      await handleSubmit();
    } catch (error) {
      console.error("Error during transaction or data generation:", error);
      addToast("Error during transaction or data generation", "error");
    }
  };

  return (
    <div>
      <Dialog
        onOpenChange={(open) => {
          if (!open) {
            resetForm();
          }
        }}
      >
        <DialogTrigger asChild>
          <Button
            ref={openButtonRef}
            variant="default"
            size="lg"
            className="w-full"
          >
            Create Data
          </Button>
        </DialogTrigger>
        <DialogContent>
          {currentStep === "form" && (
            <div className="h-full flex flex-col justify-center">
              <DialogHeader>
                <DialogTitle>
                  <div className="absolute top-4 left-4 sm:left-20 sm:top-10">
                    Create Data
                  </div>
                </DialogTitle>
              </DialogHeader>

              <div className="mx-2 mb-4 sm:mb-0 sm:mx-0 px-2 sm:px-6 pb-4 sm:pb-12 pt-8 bg-hunterGreen border border-white/40 rounded-lg mt-16 sm:mt-10">
                <div className="grid grid-cols-12 gap-8 sm:gap-10">
                  <div className="col-span-12 sm:col-span-7 space-y-6 ">
                    <div className="space-y-2">
                      <Label>Data Type</Label>

                      <Select onValueChange={setDataType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Data Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="regular">Regular</SelectItem>
                            <SelectItem value="timeseries">
                              Timeseries
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>

                      <p className=" p-2 block sm:hidden text-sm text-white">
                        Data type is the type of data -ex. Regular
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="file">CSV file</Label>

                      <Input ref={fileInputRef} id="file" type="file" />

                      <p className=" p-2 block sm:hidden text-sm text-white">
                        CSV file - ex. Name, ID
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="num_rows">Number of Rows</Label>

                      <Input
                        id="num_rows"
                        type="number"
                        placeholder="How many rows in output file?"
                        value={numRows}
                        onChange={(e) => setNumRows(e.target.value)}
                      />

                      <p className=" p-2 block sm:hidden text-sm text-white">
                        Number of rows - how many rows in output field?
                      </p>
                    </div>

                    {/* <div>
                  <Label htmlFor="batch_size">Batch Size</Label>
                  <Input
                    id="batch_size"
                    type="number"
                    defaultValue={batchSize}
                    placeholder="Enter batch size"
                    onChange={handleBatchSizeChange}
                  />
                </div> */}
                  </div>

                  <div className="hidden sm:block col-span-12 sm:col-span-5 border rounded-lg py-8 px-4 border-white/40 space-y-8 sm:space-y-16">
                    <p className="text-sm text-white">
                      Data type is the type of data <br /> -ex. Regular
                    </p>

                    <p className="text-sm text-white">
                      CSV file - ex. Name, ID
                    </p>

                    <p className="text-sm text-white">
                      Number of rows - how many rows in output field?
                    </p>
                  </div>
                </div>

                <div className="pt-10">
                  <Button
                    onClick={handleTransactionAndDataGeneration}
                    variant="default"
                    type="button"
                    size="lg"
                    className="w-60 px-44"
                  >
                    Generate
                  </Button>
                </div>
              </div>
            </div>
          )}

          {currentStep === "loading" && (
            <div className="h-full w-full flex flex-col items-center justify-center">
              <Image
                src="/images/loader.svg"
                height={100}
                width={100}
                alt="Loader"
              />
              <p className="font-medium text-charcoal dark:text-white text-base">
                We are generating your data
              </p>
            </div>
          )}

          {currentStep === "result" && (
            <div className="h-full w-full flex flex-col gap-6 items-center justify-center">
              <Image
                src="/images/download.svg"
                height={180}
                width={150}
                alt="Loader"
              />
              <Button
                variant="default"
                type="button"
                size="default"
                className="w-full"
                onClick={downloadCSV}
              >
                Download CSV file
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PopUpModal;
