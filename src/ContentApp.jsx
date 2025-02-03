import { Layout } from "antd";
import InputsApp from "./InputsApp";
const contentStyle = {
  textAlign: "center",
  minHeight: "calc(100vh - 170px)",
  backgroundColor: "#002",
};

export default function ContentApp() {
  return (
    <Layout.Content style={contentStyle}>
      <InputsApp />
    </Layout.Content>
  );
}
