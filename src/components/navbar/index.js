import { Tabs, Tab } from "@mui/material";
import { Container } from "@mui/system";
import { useAppContext } from "../../context/context";
import "./index.scss";

export default function Navbar() {
  const { tab, setTab } = useAppContext();
  let _handleChange = (e, newValue) => {
    setTab(newValue);
  };

  return (
    <div className="navbar">
      <Container sx={{ height: "100%" }}>
        <div className="navbar__links">
          <Tabs value={tab} onChange={_handleChange}>
            <Tab label="Creator View" />
            <Tab label="Respondent View" />
          </Tabs>
        </div>
      </Container>
    </div>
  );
}
