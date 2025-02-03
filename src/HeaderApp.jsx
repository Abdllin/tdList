import { Layout } from "antd";
const headerStyle = {
  textAlign: "center",
  color: "#fff",
  height: 170,
  paddingInline: 48,
  lineHeight: "64px",
  backgroundColor: "#000",
};

export default function HeaderApp() {
  return <Layout.Header style={headerStyle}></Layout.Header>;
}
