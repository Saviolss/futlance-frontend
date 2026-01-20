import { useTranslation } from "react-i18next";
export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="w-full sm:block md:flex md:justify-center gap-1 bg-[#010056] text-white text-center py-4 mt-10 border-t border-t-white ">
      <p>&copy; {new Date().getFullYear()} 
        {t('footertext')}
      </p>
      <a href="mailto:futlanceweb@gmail.com" className="underline">
       {t("faleconosco")}
      </a>

    </footer>
  );
}