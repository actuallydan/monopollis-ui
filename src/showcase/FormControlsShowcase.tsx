import { useState } from "react";
import {
  Checkbox,
  Switch,
  Radio,
  RangeSlider,
  Card,
  Header,
  Paragraph,
  Divider,
} from "../components";

export default function FormControlsShowcase() {
  const [sliderValue, setSliderValue] = useState(50);
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [switchValue, setSwitchValue] = useState(false);
  const [radioValue, setRadioValue] = useState("option1");

  return (
    <div className="space-y-8">
      <Card title="Form Control Components" variant="bordered">
        <div className="space-y-8">
          <div>
            <Header size="lg" className="mb-4">
              Range Slider
            </Header>
            <RangeSlider
              label="Volume Level"
              value={sliderValue}
              onChange={setSliderValue}
              min={0}
              max={100}
              description="Adjust the volume from 0 to 100"
            />
          </div>

          <Divider />

          <div>
            <Header size="lg" className="mb-4">
              Checkbox & Switch
            </Header>
            <div className="space-y-4">
              <Checkbox
                label="Enable notifications"
                checked={checkboxValue}
                onChange={setCheckboxValue}
                description="Receive push notifications for updates"
              />

              <Switch
                label="Dark mode"
                checked={switchValue}
                onChange={setSwitchValue}
                description="Toggle between light and dark themes"
              />
            </div>
          </div>

          <Divider />

          <div>
            <Header size="lg" className="mb-4">
              Radio Buttons
            </Header>
            <div className="space-y-3">
              <Paragraph size="sm">Select your preferred option:</Paragraph>
              <Radio
                label="Option 1"
                checked={radioValue === "option1"}
                onChange={() => setRadioValue("option1")}
              />
              <Radio
                label="Option 2"
                checked={radioValue === "option2"}
                onChange={() => setRadioValue("option2")}
              />
              <Radio
                label="Option 3"
                checked={radioValue === "option3"}
                onChange={() => setRadioValue("option3")}
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
