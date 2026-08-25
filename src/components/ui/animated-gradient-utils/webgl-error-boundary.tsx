import React, { Component, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface WebGLErrorBoundaryProps {
    children: ReactNode;
    fallback?: ReactNode;
}

interface WebGLErrorBoundaryState {
    hasError: boolean;
}

export class WebGLErrorBoundary extends Component<WebGLErrorBoundaryProps, WebGLErrorBoundaryState> {
    constructor(props: WebGLErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(): WebGLErrorBoundaryState {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.warn("WebGL Context or Shader Error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback || <WebGLFallback />;
        }
        return this.props.children;
    }
}

export function WebGLFallback({ className }: { className?: string }) {
    return (
        <div
            className={cn(
                "absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#0f2347] to-[#070f1d] opacity-90",
                className
            )}
        />
    );
}
