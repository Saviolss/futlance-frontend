import { useTranslation } from "react-i18next";
export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="w-full bg-[#010056] text-white text-center py-4 mt-10 border-t border-t-white">
      <p>&copy; {new Date().getFullYear()} 
        {t('footertext')}
      </p>
    </footer>
  );
}