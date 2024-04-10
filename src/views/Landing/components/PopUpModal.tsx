import React, { useState, useRef } from "react";

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

const PopUpModal = () => {
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

  const handleSubmit = async () => {
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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="default" size="lg" className="w-full">
            Create Data
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Data</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 pt-12">
            <div>
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

            <div>
              <Label htmlFor="file">CSV file</Label>
              <Input ref={fileInputRef} id="file" type="file" />
            </div>

            <div>
              <Label htmlFor="num_rows">Rows Number</Label>
              <Input
                id="num_rows"
                type="number"
                placeholder="Enter number of rows"
                value={numRows}
                onChange={(e) => setNumRows(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="batch_size">Batch Size</Label>
              <Input
                id="batch_size"
                type="number"
                defaultValue={batchSize}
                placeholder="Enter batch size"
                onChange={handleBatchSizeChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={handleSubmit}
              variant="default"
              type="button"
              size="default"
              className="w-full"
            >
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PopUpModal;
