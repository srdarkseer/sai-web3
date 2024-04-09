import React from "react";

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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { MdAddBox } from "react-icons/md";
import Link from "next/link";

const PopUpModal = () => {
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
          <div className="space-y-14 pt-12">
            <Textarea placeholder="Type your prompt here." />

            <div className="grid grid-cols-11 gap-3 border border-gray-400 rounded-lg p-4">
              <div className="col-span-5 space-y-4">
                <Label htmlFor="name">Name</Label>
                <Input id="name" type="text" placeholder="Enter your name" />
              </div>
              <div className="col-span-5 space-y-4">
                <Label htmlFor="date">Data Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Data Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="string">String</SelectItem>
                      <SelectItem value="integer">Integer</SelectItem>
                      <SelectItem value="float">Float</SelectItem>
                      <SelectItem value="regular">Regular</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-1 flex h-full items-center justify-center">
                <Button variant="clear" size="icon" className=" mt-9 ">
                  <MdAddBox className="w-6 h-6 text-primary" />
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="default"
              type="submit"
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
