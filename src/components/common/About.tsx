import { motion } from "framer-motion";

const AboutSection: React.FC = () => {
  return (
    <section className="relative flex items-center justify-center  bg-blackTheme text-white">
      {/* Background decorative layers */}
      <div className="absolute inset-0">
        {/* <motion.div
          className="absolute w-full h-full bg-gradient-to-br from-redTheme via-blackTheme to-blackTheme opacity-70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        /> */}
        {/* <motion.div
          className="absolute -top-20 -left-20 w-64 h-64 animate-pulse md:w-96 md:h-96 bg-gradient-to-r from-red-600 to-black opacity-30 rounded-full"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        <motion.div
          className="absolute -bottom-20 -right-20 w-64 h-64 md:w-96 md:h-96 animate-pulse bg-gradient-to-r from-red-600 to-black opacity-30 rounded-full"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
        /> */}
      </div>

      {/* About content */}
      <motion.div
        className="relative z-10 max-w-4xl p-4 md:p-8 text-center"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <h2 className="text-4xl md:text-[89px] font-black text-red-600 mb-4 md:mb-6 leading-tight">
          About TEDxSJEC
        </h2>
        <p className="text-base md:text-3xl leading-relaxed mb-4 md:mb-6 text-gray-300">
          TEDxSJEC is an independently organized event bringing together
          innovators, thinkers, and visionaries from around the world. Our goal
          is to inspire change, provoke deep discussions, and foster creativity
          through groundbreaking ideas. Our goal is to inspire change, provoke
          deep discussions, and foster creativity through groundbreaking ideas.
        </p>

        {/* Decorative line */}
        <motion.div
          className="mt-8 md:mt-12 mx-auto w-20 md:w-24 h-1 bg-red-600 rounded-full"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
        />
      </motion.div>
    </section>
  );
};

export default AboutSection;
