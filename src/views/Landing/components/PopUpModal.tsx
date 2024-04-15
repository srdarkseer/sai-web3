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

import { generateData } from "@/store/api";

const PopUpModal = ({ isOpen }: { isOpen: boolean }) => {
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

  const handleSubmit = async () => {
    setCurrentStep("loading");
    const formData = new FormData();
    if (fileInputRef.current?.files?.[0]) {
      formData.append("file", fileInputRef.current.files[0]);
    }
    formData.append("data_type", dataType);
    formData.append("num_rows", numRows);
    formData.append("batch_size", batchSize);

    try {
      const responseData = await generateData(formData);
      console.log(responseData);
      setResponse(responseData);
      setCurrentStep("result");
    } catch (error) {
      console.error(error);
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
                  <div className="absolute top-10">Create Data</div>
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-6 px-6 pb-12 pt-8 bg-hunterGreen rounded-lg">
                <div className="space-y-2">
                  <Label>Data Type</Label>
                  <Select onValueChange={setDataType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Data Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="regular">Regular</SelectItem>
                        <SelectItem value="timeseries">Timeseries</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="file">CSV file</Label>
                  <Input ref={fileInputRef} id="file" type="file" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="num_rows">Rows Number</Label>
                  <Input
                    id="num_rows"
                    type="number"
                    placeholder="Enter number of rows"
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
              <DialogFooter className="pt-20">
                <Button
                  onClick={handleSubmit}
                  variant="default"
                  type="button"
                  size="default"
                  className="w-full"
                >
                  Generate
                </Button>
              </DialogFooter>
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
