export enum LegendEnum {
  LEFT = 'left',
  RIGHT = 'right',
  TOP = 'top',
  BOTTOM = 'bottom',
}

export type LegendPositionType = {
  left?: string;
  top?: string;
  bottom?: string;
  right?: string;
  except: Array<keyof LegendPositionType>;
};

export type LegendConfigurationType = {
  [T in LegendEnum]: LegendPositionType;
};

export const LegendConfiguration: LegendConfigurationType = {
  left: {
    left: '5%',
    top: 'center',
    except: ['bottom', 'right'],
  },
  top: {
    left: 'center',
    top: '5%',
    except: ['bottom', 'right'],
  },
  bottom: {
    bottom: '5%',
    left: 'center',
    except: ['top', 'right'],
  },
  right: {
    right: '5%',
    top: 'center',
    except: ['bottom', 'left'],
  },
};

export const XAxisConfiguration = {};
