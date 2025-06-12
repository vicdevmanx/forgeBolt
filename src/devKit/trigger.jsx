import { useState, useEffect } from "react"
import { Modal, Box } from "@mui/material"
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import { X } from "lucide-react"

export default function InfoDisplay({ info: InfoComponent, infoProps = {}, trigger }) {
  const [isMobile, setIsMobile] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const injectedProps = { ...infoProps, handleClose }

  return (
    <>
      {/* Trigger */}
      <span onClick={handleOpen} className="inline-block cursor-pointer">
        {trigger}
      </span>

      {/* Mobile Drawer */}
      {isMobile ? (
        <Drawer open={open} onOpenChange={setOpen} className="p-0 border-0">
          <DrawerTrigger asChild>
            <span className="hidden" />
          </DrawerTrigger>
          <DrawerContent className="border-0 px-4 py-3 bg-[var(--bg-secondary)] dark:bg-[var(--bg-secondary)]">
            <div className="flex flex-col items-center text-[var(--text-primary)] dark:text-[var(--text-primary)]">
              <div className="bg-[var(--bg-tertiary)] dark:bg-[var(--bg-tertiary)] w-12 h-1 rounded-full mb-2 -mt-2" />
              <InfoComponent {...injectedProps} />
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "var(--bg-color)",
              color: "var(--text-primary)",
              boxShadow: 24,
              p: 0,
              borderRadius: 10,
              maxWidth: "900px",
              maxHeight: "90vh",
              overflow: "auto",
            }}
          >
            <InfoComponent {...injectedProps} />
          </Box>
        </Modal>
      )}
    </>
  )
}
