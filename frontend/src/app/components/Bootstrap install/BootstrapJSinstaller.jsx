"use client";
import React, { useEffect } from "react";

export default function BootstrapSetup() {
    useEffect(() => {
        if (typeof document !== "undefined") {
            import("bootstrap/dist/js/bootstrap");
        }
    }, []);

    return null;
}
