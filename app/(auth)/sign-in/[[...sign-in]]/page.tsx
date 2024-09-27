'use client'

import { SignIn } from "@clerk/nextjs";
import { Box, Flex } from "@chakra-ui/react";
import LogoImage from '@/assets/images/logo.svg'
import React from "react";

export default function Page() {
  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Box pb={6}>
        <LogoImage
          alt="dark-mode-image"
          width={300}
          height={300}
        />
      </Box>
      <SignIn
        path="/sign-in"
        appearance={{
          layout: {
            logoPlacement: "none",
          },
        }}
      />
    </Flex>
  );
}