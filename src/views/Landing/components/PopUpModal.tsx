import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
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

import Web3 from "web3";

import { generateData } from "@/store/api";

// Minimal ERC-20 Token ABI
const tokenABI = [
  {
    constant: false,
    inputs: [
      {
        name: "_to",
        type: "address",
      },
      {
        name: "_value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    type: "function",
  },
];

const PopUpModal = ({ isOpen }: { isOpen: boolean }) => {
  // State for managing the multi-step process
  const [currentStep, setCurrentStep] = useState("form"); // "form", "loading", "result"
  const [response, setResponse] = useState<string | null>(null);

  // Additional states and refs
  const openButtonRef = useRef<HTMLButtonElement>(null);

  // State for form inputs
  const [dataType, setDataType] = useState("");
  const [numRows, setNumRows] = useState("");
  const [batchSize, setBatchSize] = useState("200");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleBatchSizeChange = (e: any) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue)) {
      setBatchSize(newValue.toString());
    }
  };

  // Attempt to open the dialog if isOpen changes to true
  useEffect(() => {
    if (isOpen && openButtonRef.current) {
      openButtonRef.current.click();
    }
  }, [isOpen]);

  const signTransaction = async () => {
    const web3 = new Web3(
      Web3.givenProvider ||
        "https://site1.moralis-nodes.com/eth/fd720cb6405b4cb0b65c949ac11ee75e"
    );
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];

    const contract = new web3.eth.Contract(
      tokenABI,
      "0xe722C6833a0BF4B874C18C3f10cB54fD58A4180A"
    );

    const tx = {
      from: account,
      gas: 200000,
      to: "0xe722C6833a0BF4B874C18C3f10cB54fD58A4180A",
      data: contract.methods
        .transfer(
          "0x23bFAabAd0240CAEd597e243B804480660F5ab72",
          web3.utils.toWei("10", "ether")
        )
        .encodeABI(), // 10 tokens
    };

    return web3.eth
      .sendTransaction(tx)
      .then((txResponse) => {
        console.log("Transaction Hash:", txResponse.transactionHash);
        return { success: true, txHash: txResponse.transactionHash };
      })
      .catch((error) => {
        console.error("Transaction failed:", error);
        return { success: false, error: error.message };
      });
  };

  const handleSubmit = async () => {
    setCurrentStep("loading");

    try {
      const signResponse = await signTransaction();
      console.log("Transaction Signed:", signResponse);

      if (signResponse.success) {
        const formData = new FormData();
        if (fileInputRef.current?.files?.[0]) {
          formData.append("file", fileInputRef.current.files[0]);
        }
        formData.append("data_type", dataType);
        formData.append("num_rows", numRows);

        // Here, integrate with your backend to handle formData
        console.log("Data submitted:", formData);
        setResponse("Simulated Response Data");
        setCurrentStep("result");
      } else {
        throw new Error("Transaction signing failed");
      }
    } catch (error) {
      console.error("Error during the process:", error);
      setCurrentStep("form");
    }
  };

  const downloadCSV = () => {
    if (!response) {
      console.error("No CSV data available");
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
                  <div className="absolute top-4 left-2 sm:top-10">Create Data</div>
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
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="file">CSV file</Label>

                      <Input ref={fileInputRef} id="file" type="file" />
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

                  <div className="col-span-12 sm:col-span-5 border rounded-lg py-8 px-4 border-white/40 space-y-8 sm:space-y-16">
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
                    onClick={handleSubmit}
                    variant="default"
                    type="button"
                    size="lg"
                    className="w-60 px-44"
                  >
                    Generate
                  </Button>
                </div>
              </div>
              {/* <DialogFooter className="pt-20">
                
              </DialogFooter> */}
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
