import { useState } from 'react';
import type { ReactNode } from 'react';

import { CheckBoxWithLabel } from './checkbox-with-label';
import { PaymentCardWrapper } from './payment-wrapper';

interface Props {
  checkBoxLabel: string;
  children: ReactNode;
}

export const WrapperWithCheckBox = ({ checkBoxLabel, children }: Props) => {
  const [checked, setChecked] = useState(false);

  return (
    <PaymentCardWrapper className="w-full rounded-md p-3 shadow-none">
      <CheckBoxWithLabel
        label={checkBoxLabel}
        checked={checked}
        onCheckedChange={(value) => setChecked(value === true)}
      />

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          checked
            ? 'mt-4 grid-rows-[1fr] opacity-100'
            : 'mt-0 grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">{children}</div>
      </div>
    </PaymentCardWrapper>
  );
};
