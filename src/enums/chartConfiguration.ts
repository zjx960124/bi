export enum LegendEnum {
  LEFT = 'left',
  RIGHT = 'right',
  TOP = 'top',
  BOTTOM = 'bottom',
}

export type PositionType = {
  left?: string;
  top?: string;
  bottom?: string;
  right?: string;
  legendPosition: string;
};

export interface LegendPositionType extends PositionType {
  orient?: string;
  except: Array<keyof PositionType>;
}

export type LegendConfigurationType = {
  [T: string]: LegendPositionType;
};

export const LegendConfiguration: LegendConfigurationType = {
  left: {
    left: '0%',
    top: 'center',
    orient: 'vertical',
    except: ['bottom', 'right'],
    legendPosition: 'left',
  },
  top: {
    left: 'center',
    top: '0%',
    orient: 'horizontal',
    except: ['bottom', 'right'],
    legendPosition: 'top',
  },
  bottom: {
    bottom: '0%',
    left: 'center',
    orient: 'horizontal',
    except: ['top', 'right'],
    legendPosition: 'bottom',
  },
  right: {
    right: '0%',
    top: 'center',
    orient: 'vertical',
    except: ['bottom', 'left'],
    legendPosition: 'right',
  },
};

export const XAxisConfiguration = {};
