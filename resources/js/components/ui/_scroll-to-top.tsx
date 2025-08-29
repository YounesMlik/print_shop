import { Button, buttonVariants } from "@/components/ui/button";
import { VariantProps } from "class-variance-authority";
import { useEffect, useState } from "react";

export function ScrollToTop({
    minHeight, // Height from which button will be visible
    scrollTo, // Height to go on scroll to top
    ...props
}: ButtonProps & { minHeight?: number; scrollTo?: number }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setVisible(document.documentElement.scrollTop >= (minHeight ?? 0));
        };

        onScroll();
        document.addEventListener("scroll", onScroll);

        return () => document.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <>
            {visible && (
                <Button
                    onClick={() =>
                        window.scrollTo({
                            top: scrollTo ?? 0,
                            behavior: "smooth",
                        })
                    }
                    {...props}
                />
            )}
        </>
    );
}

type ButtonProps = React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean
    }