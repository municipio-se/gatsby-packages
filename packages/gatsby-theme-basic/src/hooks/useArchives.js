import { useTranslation } from "react-i18next";

export default function useArchives() {
  const { t } = useTranslation();
  return {
    post: {
      url: "/nyheter",
      label: t("allPostsLabel"),
    },
  };
}
