
"use client";
import React, { useContext, useState, useEffect } from "react";
import {
  Image,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Divider,
  Link,
  Tabs,
  Tab,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";

export default function Second(){
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return <div><Button onPress={onOpen}> text
    {" "}
  </Button>
  <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
    <ModalContent className=''>
      {(onClose) => (
        <>
          <ModalHeader className="flex flex-col gap-1">
            Modal Title
          </ModalHeader>
          <ModalBody>
            <p>
              Magna exercitation reprehenderit magna aute tempor
              cupidatat consequat elit dolor adipisicing. Mollit
              dolor eiusmod sunt ex incididunt cillum quis. Velit
              duis sit officia eiusmod Lorem aliqua enim laboris
              do dolor eiusmod. Et mollit incididunt nisi
              consectetur esse laborum eiusmod pariatur proident
              Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="light"
              onPress={onClose}
            >
              Close
            </Button>
            <Button color="primary" onPress={onClose}>
              Action
            </Button>
          </ModalFooter>
        </>
      )}
    </ModalContent>
  </Modal></div>
}