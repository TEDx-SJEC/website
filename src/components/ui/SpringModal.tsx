import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, SetStateAction, useState } from "react";

// Define props type for ExampleWrapper
type ExampleWrapperProps = {
  description: string;
};

const MoreInfo = ({ description }: ExampleWrapperProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-redTheme text-white font-medium px-4 py-2 rounded hover:opacity-90 transition-opacity"
      >
        More Info
      </button>
      {/* Pass props down to SpringModal */}
      <SpringModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        description={description}
      />
    </>
  );
};

// Define props type for SpringModal
type SpringModalProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  description: string;
};

const SpringModal = ({ isOpen, setIsOpen, description }: SpringModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className=" backdrop-blur fixed inset-0 z-50 grid place-items-center  cursor-pointer h-full w-full"
        >
          <motion.div
            initial={{ scale: 0, rotate: "0deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-redTheme text-white p-2 h-full w-full max-w-lg cursor-default relative overflow-hidden py-2"
          >
            <div className="relative z-10 flex flex-col justify-between h-full">
              <p className="text-center mb-6 leading-snug">{description}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="bg-white hover:opacity-90 transition-opacity text-blackTheme font-semibold w-full py-2 mb-4 rounded"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MoreInfo;
