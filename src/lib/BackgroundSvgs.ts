export const getBackgroundStyle = (backgroundType: string) => {
  switch (backgroundType) {
    case "bg1":
      return {
        backgroundColor: "#ff0000",
        backgroundImage: 'url("data:image/svg+xml, ... ")',
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
      };
    case "bg2":
      return {
        backgroundColor: "#330033",
        backgroundImage: 'url("data:image/svg+xml, ... ")',
      };
    case "bg3":
      return {
        backgroundColor: "#000000",
        backgroundImage: 'url("data:image/svg+xml, ... ")',
      };
    case "bg4":
      return {
        backgroundColor: "#ffffff",
        backgroundImage: 'url("data:image/svg+xml, ... ")',
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
      };
    default:
      return {
        background: "linear-gradient(to bottom, #21014f, #1a1b2e)",
      };
  }
};
