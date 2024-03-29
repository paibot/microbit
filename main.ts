/*
 paibot package
*/
//% weight=10 icon="\uf013" color=#2896ff
namespace paibot {

    export enum paibot_Colors {
        //% block="Red"
        Red = 0x01,
        //% block="Green"
        Green = 0x02,
        //% block="Blue"
        Blue = 0x03,
        //% block="Black"
        Black = 0x04,
        //% block="White"
        White = 0x05,
        //% block="None"
        None = 0x06
    }

    export enum paibot_lineFollower {
        //% blockId="S1_OUT_S2_OUT" block="Sensor1 and sensor2 are out black line"
        S1_OUT_S2_OUT = 0x00,
        //% blockId="S1_OUT_S2_IN" block="Sensor2 in black line but sensor1 not"
        S1_OUT_S2_IN = 0x01,
        //% blockId="S1_IN_S2_OUT" block="Sensor1 in black line but sensor2 not"
        S1_IN_S2_OUT = 0x02,
        //% blockId="S1_IN_S2_IN" block="Sensor1 and sensor2 are in black line "
        S1_IN_S2_IN = 0x03
    }

    export enum paibot_colorSensorPort {
        //% block="Port 4"
        port4 = 0x04
    }

    export enum paibot_Servos {
        //% block="servo 1"
        Servo1 = 0x01,
        //% block="servo 2"
        Servo2 = 0x02
    }

    export enum paibot_ultrasonicPort {
        //% block="Port 1"
        port1 = 0x01,
        //% block="Port 2"
        port2 = 0x02
    }

    export enum paibot_touchKeyPort {
        //% block="Port 1"
        port1 = 0x01,
        //% block="Port 2"
        port2 = 0x02,
        //% block="Port 3"
        port3 = 0x03
    }

    export enum paibot_lineFollowPort {
        //% block="Port 1"
        port1 = 0x01,
        //% block="Port 2"
        port2 = 0x02,
        //% block="Port 4"
        port4 = 0x04
    }

    export enum paibot_motionSensorType {
        //% block="Rotation"
        motion_rotation = 0x01,
    }

    export enum paibot_motionSensorAxis {
        //% block="X axis"
        axis_x = 0x00,
        //% block="Y axis"
        axis_y = 0x01,
        //% block="Z axis"
        axis_z = 0x02,
    }

    export enum paibot_adChannelType {
        //% block="Channel 0"
        adch_0 = 0x00,    
        //% block="Channel 2"
        adch_2 = 0x02,
        //% block="Channel 3"
        adch_3 = 0x03,
        //% block="Channel 4"
        adch_4 = 0x04,
        //% block="Channel 5"
        adch_5 = 0x05,
        //% block="Channel 6"
        adch_6 = 0x06,
        //% block="Channel 7"
        adch_7 = 0x07,        
    }
    
    export enum paibot_PinIOStatus {
        //% block="Low"
        Low = 0x00,
        //% block="High"
        Hight = 0x01
    }

    export enum paibot_LineFollowerSensor {
        //% block="Sensor 1"
        LFSensor_1 = 0x00,
        //% block="Sensor 2"
        LFSensor_2 = 0x01
    }

    export enum paibot_busServoPort {
        //% block="Port 6"
        port6 = 0x06
    }

    export enum paibot_knobPort {
        //% block="Port 1"
        port1 = 0x01
    }

    export enum paibot_photosensitivePort {
        //% block="Port 1"
        port1 = 0x01
    }

    export enum paibot_PhotosensitiveSensor {
        //% block="Port 1"
        port1 = 0x00
    }

    export enum paibot_fanPort {
        //% block="Port 1"
        port1,
        //% block="Port 2"
        port2
    }

    export enum paibot_servorange {
        //% block="180"
        range1 = 180,
        //% block="270"
        range2 = 270
    }

    export enum paibot_digitaltubePort {
        //% block="Port 1"
        port1 = 0x01,
        //% block="Port 2"
        port2 = 0x02
    }

    export enum paibot_CmdType {
        //% block="Invalid command"
        NO_COMMAND = 0,
        //% block="car run"
        CAR_RUN = 1,
        //% block="robot run"   
        ROBOT_RUN = 1,
        //% block="Servo"
        SERVO = 2,
        //% block="Ultrasonic distance"
        ULTRASONIC = 3,
        //% block="Temperature"
        TEMPERATURE = 4,
        //% block="Sound"
        SOUND = 5,
        //% block="Light"
        LIGHT = 6,
        //% block="Voltage"
        BAT = 7,
        //% block="Rgb light"
        RGB_LIGHT = 8,
        //% block="Honk horn"
        DIDI = 9,
        //% block="Read firmware version"
        VERSION = 10,
        //% block="Read angle"
        READ_ANGLE = 11,
        //% block="Light belt"        
        RGB_BELT = 12,
        //% block="WIFI mode"
        WIFI_MODE = 13,
        //% block="Get mac"
        GET_MAC = 14,
        //% block="Get hand cmd"
        GET_HAND_CMD = 15
    }

    export enum paibot_CarRunCmdType {
        //% block="Stop"
        STOP = 0,
        //% block="Go ahead"
        GO_AHEAD,
        //% block="Back"
        GO_BACK,
        //% block="Turn left"
        TURN_LEFT,
        //% block="Turn right"
        TURN_RIGHT,
        //% block="Go ahead slowly"
        GO_AHEAD_SLOW,
        //% block="Turn left slowly"
        TURN_LEFT_SLOW,
        //% block="Turn right slowly"
        TURN_RIGHT_SLOW,
        //% block="Invalid command"
        COMMAND_ERRO
    }

    /**
     * Paibot initialization, please execute at boot time
    */
    //% weight=100 blockId=paibot_Init block="Initialize Paibot"
    export function paibot_Init() {
        paibot_initRGBLight();
        serial.redirect(
            SerialPin.P12,
            SerialPin.P8,
            BaudRate.BaudRate115200);
        basic.forever(() => {
            getHandleCmd();
        });
        basic.pause(2000);
    }


    let handleCmd: string = "";
    let currentVoltage: number = 0;
    let volume: number = 0;
    let lhRGBLight: PaibotRGBLight.LHpaibotRGBLight;
    let lhRGBLightBelt: PaibotRGBLight.LHpaibotRGBLight;

    let P14_ad = 0;


    let MESSAGE_MAC = 0xff;
    let MESSAGE_ANGLE = 0x100;

    let i2cPortValid: boolean = true;
    let connectStatus: boolean = false;

    let servo1Angle: number = 0xfff;
    let servo2Angle: number = 0xfff;

    let macStr: string = "";
    let actiongroup_finished = true;

    let Digitaltube: paibot_TM1640LEDs
    let TM1640_CMD1 = 0x40;
    let TM1640_CMD2 = 0xC0;
    let TM1640_CMD3 = 0x80;
    let _SEGMENTS = [0x3F, 0x06, 0x5B, 0x4F, 0x66, 0x6D, 0x7D, 0x07, 0x7F, 0x6F, 0x77, 0x7C, 0x39, 0x5E, 0x79, 0x71];

    /**
    * Get the handle command.
    */
    function getHandleCmd() {
        let charStr: string = serial.readString();
        handleCmd = handleCmd.concat(charStr);
        let cnt: number = countChar(handleCmd, "$");
        if (cnt == 0)
            return;
        let index = findIndexof(handleCmd, "$", 0);
        if (index != -1) {
            let cmd: string = handleCmd.substr(0, index);
            if (cmd.charAt(0).compare("A") == 0) {
                if (cmd.length == 7) {
                    let arg1Int: number = strToNumber(cmd.substr(1, 2));
                    let arg2Int: number = strToNumber(cmd.substr(3, 2));
                    let arg3Int: number = strToNumber(cmd.substr(5, 2));

                    P14_ad = arg1Int;

                    if (arg3Int != -1) {
                        currentVoltage = arg3Int * 10353 / 400;
                        currentVoltage = Math.round(currentVoltage);
                    }

                    if (arg2Int != -1) {
                        volume = arg2Int;
                    }
                } else if (cmd.length == 5) {
                    actiongroup_finished = true;
                } else {

                }
            }
            if (cmd.charAt(0).compare("C") == 0 && cmd.length == 11) {
                if (lhRGBLightBelt != null) {
                    for (let i = 0; i < 10; i++) {
                        let color = converOneChar(cmd.charAt(i + 1));
                        if (color != -1)
                            lhRGBLightBelt.setBeltPixelColor(i, color);
                    }
                    lhRGBLightBelt.show();
                }
            }
            if (cmd.charAt(0).compare("M") == 0 && cmd.length == 18) {
                macStr = cmd.substr(1, 17);
                control.raiseEvent(MESSAGE_MAC, 1);
            }
            if (cmd.compare("WIFI_S_CONNECT") == 0) {
                connectStatus = true;
            }
            if (cmd.compare("WIFI_S_DISCONNECT") == 0) {
                connectStatus = false;
            }
            if (cmd.charAt(0).compare("S") == 0 && cmd.length == 5) {
                let arg1Int: number = strToNumber(cmd.substr(1, 1));
                let arg2Str = cmd.substr(2, 3);
                if (arg2Str.compare("XXX") == 0) {
                    return;
                }
                let arg2Int: number = 0;
                if (arg2Str.charAt(0).compare("F") != 0) {
                    arg2Int = strToNumber(arg2Str);
                }
                if (arg2Int > 1000)
                    arg2Int = 1000;
                if (arg1Int == 1) {
                    servo1Angle = mapRGB(arg2Int, 0, 1000, 0, 240);
                    servo1Angle -= 120;
                    control.raiseEvent(MESSAGE_ANGLE, 1);
                }
                else if (arg1Int == 2) {
                    servo2Angle = mapRGB(arg2Int, 0, 1000, 0, 240);
                    servo2Angle -= 120;
                    control.raiseEvent(MESSAGE_ANGLE, 2);
                }
            }
        }
        handleCmd = "";
    }

    function checkADPortValue(value: number): number {
        if (value == -1)
            return 2;
        if (value <= 0x2E)
            return 0;
        else if (value >= 0xAA)
            return 1;
        else
            return 2;
    }

    function findIndexof(src: string, strFind: string, startIndex: number): number {
        for (let i = startIndex; i < src.length; i++) {
            if (src.charAt(i).compare(strFind) == 0) {
                return i;
            }
        }
        return -1;
    }

    function countChar(src: string, strFind: string): number {
        let cnt: number = 0;
        for (let i = 0; i < src.length; i++) {
            if (src.charAt(i).compare(strFind) == 0) {
                cnt++;
            }
        }
        return cnt;
    }

    function strToNumber(str: string): number {
        let num: number = 0;
        for (let i = 0; i < str.length; i++) {
            let tmp: number = converOneChar(str.charAt(i));
            if (tmp == -1)
                return -1;
            if (i > 0)
                num *= 16;
            num += tmp;
        }
        return num;
    }

    function decStrToNumber(str: string): number {
        let num: number = 0;
        for (let i = 0; i < str.length; i++) {
            let tmp: number = converOneChar(str.charAt(i));
            if (tmp == -1)
                return -1;
            if (i > 0)
                num *= 10;
            num += tmp;
        }
        return num;
    }

    function converOneChar(str: string): number {
        if (str.compare("0") >= 0 && str.compare("9") <= 0) {
            return parseInt(str);
        }
        else if (str.compare("A") >= 0 && str.compare("F") <= 0) {
            if (str.compare("A") == 0) {
                return 10;
            }
            else if (str.compare("B") == 0) {
                return 11;
            }
            else if (str.compare("C") == 0) {
                return 12;
            }
            else if (str.compare("D") == 0) {
                return 13;
            }
            else if (str.compare("E") == 0) {
                return 14;
            }
            else if (str.compare("F") == 0) {
                return 15;
            }
            return -1;
        }
        else
            return -1;
    }

    /**
    * Set the angle of servo 1 to 8, range of 0~270 degree
    */
    //% weight=99 blockId=setServo block="Set pwm servo range|range %range|index %index|angle %angle|duration %duration"
    //% angle.min=0 angle.max=270
    //% inlineInputMode=inline
    export function setServo(range: paibot_servorange, index: number = 1, angle: number, duration: number = 300) {

        let position = mapRGB(angle, 0, range, 500, 2500);

        let buf = pins.createBuffer(10);
        buf[0] = 0x55;
        buf[1] = 0x55;
        buf[2] = 0x08;
        buf[3] = 0x03;//cmd type
        buf[4] = 0x01;
        buf[5] = duration & 0xff;
        buf[6] = (duration >> 8) & 0xff;
        buf[7] = index;
        buf[8] = position & 0xff;
        buf[9] = (position >> 8) & 0xff;
        serial.writeBuffer(buf);
    }


    /**
    * Set the servo controller to run a actiongroup
    * @param times Running times. eg: 1
    */
    //% weight=96 blockId=paibot_runActionGroup block="Run ActionGroup|index %index|times %times"
    export function paibot_runActionGroup(index: number, times: number = 1) {

        let buf = pins.createBuffer(7);
        buf[0] = 0x55;
        buf[1] = 0x55;
        buf[2] = 0x05;
        buf[3] = 0x06;//cmd type CMD_ACTION_GROUP_RUN
        buf[4] = index & 0xff;
        buf[5] = times & 0xff;
        buf[6] = (times >> 8) & 0xff;

        actiongroup_finished = false;
        serial.writeBuffer(buf);
    }

    /**
    * Stop running actiongroup
    */
    //% weight=95 blockId=paibot_stopnActionGroup block="Stop ActionGroup"
    export function paibot_stopActionGroup() {

        let buf = pins.createBuffer(7);
        buf[0] = 0x55;
        buf[1] = 0x55;
        buf[2] = 0x02;
        buf[3] = 0x07;//cmd type CMD_ACTION_GROUP_STOP

        actiongroup_finished = false;
        serial.writeBuffer(buf);
    }

    /**
     * Wait for Actiongroup Finishing
     */
    //% weight=94 blockId=paibot_actionRunover block="Action run over"
    export function paibot_actionRunover(): boolean {
        // let ret = false;
        if (actiongroup_finished == true) {
            // ret = true;
            actiongroup_finished = true;
        }
        else {
            actiongroup_finished = false;
        }
        return actiongroup_finished;
    }


    /**
     * Send read paibot servos angle command
     */
    //% weight=92 blockId=paibot_readAngle block="Send |%servo|angle command "
    export function paibot_readAngle(servo: paibot_Servos) {
        let buf = pins.createBuffer(6);
        buf[0] = 0x55;
        buf[1] = 0x55;
        buf[2] = 0x04;
        buf[3] = 0x3E;//cmd type
        buf[4] = 0x05;
        buf[5] = servo;
        serial.writeBuffer(buf);
    }


    /**
     * Do someting when Paibot receive angle
     * @param body code to run when event is raised
     */
    //% weight=90 blockId=onPaibot_getAngle block="on Paibot|%servo|get angle"
    export function onPaibot_getAngle(servo: paibot_Servos, body: Action) {
        control.onEvent(MESSAGE_ANGLE, servo, body);
    }


    /**
     *  Get servos angle
     */
    //% weight=88 blockId=getServosAngle blockGap=50 block="Get|%servo|angle(-120~120)"
    export function getServosAngle(servo: paibot_Servos): number {
        if (servo == paibot_Servos.Servo1) {
            return servo1Angle;
        }
        else if (servo == paibot_Servos.Servo2) {
            return servo2Angle;
        }
        else
            return 0xFFF;
    }

    /**
     *  Send robot attitude to the servo controller
     *  @param pitch eg: 0
     *  @param roll eg: 0
     */
    //% weight=91 blockId=paibot_sendAttitude block="Send pitch|%pitch|and roll|%roll"
    /*
     export function paibot_sendAttitude(pitch: number, roll: number) {
         pitch < -90 ? -90 : pitch;
         pitch > 90 ? 90 : pitch;
         roll < -90 ? -90 : roll;
         roll > 90 ? 90 : roll;
 
         let buf = pins.createBuffer(6);
         buf[0] = 0x55;
         buf[1] = 0x55;
         buf[2] = 0x04;
         buf[3] = 0x5A;
         buf[4] = pitch;
         buf[5] = roll;
         serial.writeBuffer(buf);
     }
     */

    /**
    *   Set the speed of the number 1 motor and number 2 motor, range of -100~100, that can control the tank to go advance or turn of.
    */
    //% weight=86 blockId=paibot_setMotorSpeed  block="Set motor1 speed(-100~100)|%speed1|and motor2|speed %speed2"
    //% speed1.min=-100 speed1.max=100
    //% speed2.min=-100 speed2.max=100
    export function paibot_setMotorSpeed(speed1: number, speed2: number) {
        if (speed1 > 100 || speed1 < -100 || speed2 > 100 || speed2 < -100) {
            return;
        }
        speed1 = speed1 * -1;
        speed2 = speed2 * -1;
        let buf = pins.createBuffer(6);
        buf[0] = 0x55;
        buf[1] = 0x55;
        buf[2] = 0x04;
        buf[3] = 0x32;//cmd type
        buf[4] = speed1;
        buf[5] = speed2;
        serial.writeBuffer(buf);
    }

    /**
    *   Set the speed of the fan, range of -100~100.
    */
    //% weight=84 blockId=paibot_setFanSpeed  block="Set |%port fan speed(-100~100)|%speed1"
    //% speed1.min=-100 speed1.max=100
    export function paibot_setFanSpeed(port: paibot_fanPort, speed1: number) {
        if (speed1 > 100 || speed1 < -100) {
            return;
        }
        let pin1 = AnalogPin.P1;
        let pin2 = AnalogPin.P2;

        if (port == paibot_fanPort.port2) {
            pin1 = AnalogPin.P13;
            pin2 = AnalogPin.P14;
        }
        if (speed1 < 0) {
            pins.analogWritePin(pin2, 0);
            pins.analogWritePin(pin1, pins.map(-speed1, 0, 100, 0, 1023));
        }
        else if (speed1 > 0) {
            pins.analogWritePin(pin1, 0);
            pins.analogWritePin(pin2, pins.map(speed1, 0, 100, 0, 1023));
        }
        else {
            pins.analogWritePin(pin2, 0);
            pins.analogWritePin(pin1, 0);
        }

    }

    /**
    * Get the volume level detected by the sound sensor, range 0 to 255
    */
    //% weight=82 blockId=paibot_getSoundVolume block="Sound volume"
    export function paibot_getSoundVolume(): number {
        return volume;
    }

    /**
     *  Get paibot current voltage,the unit is mV
    */
    //% weight=80 blockGap=50 blockId=paibot_getBatVoltage block="Get paibot current voltage (mV)"
    export function paibot_getBatVoltage(): number {
        return currentVoltage;
    }

    /**
        * TM1640 LED display
        */
    export class paibot_TM1640LEDs {
        buf: Buffer;
        clk: DigitalPin;
        dio: DigitalPin;
        _ON: number;
        brightness: number;
        count: number;  // number of LEDs

        /**
         * initial TM1640
         */
        init(): void {
            pins.digitalWritePin(this.clk, 0);
            pins.digitalWritePin(this.dio, 0);
            this._ON = 8;
            this.buf = pins.createBuffer(this.count);
            this.clear();
        }

        /**
         * Start 
         */
        _start() {
            pins.digitalWritePin(this.dio, 0);
            pins.digitalWritePin(this.clk, 0);
        }

        /**
         * Stop
         */
        _stop() {
            pins.digitalWritePin(this.dio, 0);
            pins.digitalWritePin(this.clk, 1);
            pins.digitalWritePin(this.dio, 1);
        }

        /**
         * send command1
         */
        _write_data_cmd() {
            this._start();
            this._write_byte(TM1640_CMD1);
            this._stop();
        }

        /**
         * send command3
         */
        _write_dsp_ctrl() {
            this._start();
            this._write_byte(TM1640_CMD3 | this._ON | this.brightness);
            this._stop();
        }

        /**
         * send a byte to 2-wire interface
         */
        _write_byte(b: number) {
            for (let i = 0; i < 8; i++) {
                pins.digitalWritePin(this.clk, 0);
                pins.digitalWritePin(this.dio, (b >> i) & 1);
                pins.digitalWritePin(this.clk, 1);

            }
            pins.digitalWritePin(this.clk, 1);
            pins.digitalWritePin(this.clk, 0);
        }

        intensity(val: number = 7) {
            if (val < 1) {
                this.off();
                return;
            }
            if (val > 8) val = 8;
            this._ON = 8;
            this.brightness = val - 1;
            this._write_data_cmd();
            this._write_dsp_ctrl();
        }

        /**
         * set data to TM1640, with given bit
         */
        _dat(bit: number, dat: number) {
            this._write_data_cmd();
            this._start();
            this._write_byte(TM1640_CMD2 | (bit % this.count))
            this._write_byte(dat);
            this._stop();
            this._write_dsp_ctrl();
        }


        showbit(num: number = 5, bit: number = 0) {
            this.buf[bit % this.count] = _SEGMENTS[num % 16]
            this._dat(bit, _SEGMENTS[num % 16])
        }

        showNumber(num: number) {
            if (num < 0) {
                this._dat(0, 0x40) // '-'
                num = -num
            }
            else
                this.showbit(Math.idiv(num, 1000) % 10)
            this.showbit(num % 10, 3)
            this.showbit(Math.idiv(num, 10) % 10, 2)
            this.showbit(Math.idiv(num, 100) % 10, 1)
        }

        showHex(num: number) {
            if (num < 0) {
                this._dat(0, 0x40) // '-'
                num = -num
            }
            else
                this.showbit((num >> 12) % 16)
            this.showbit(num % 16, 3)
            this.showbit((num >> 4) % 16, 2)
            this.showbit((num >> 8) % 16, 1)
        }


        showDP(bit: number = 1, show: boolean = true) {
            bit = bit % this.count
            if (show) this._dat(bit, this.buf[bit] | 0x80)
            else this._dat(bit, this.buf[bit] & 0x7F)
        }

        clear() {
            for (let i = 0; i < this.count; i++) {
                this._dat(i, 0)
                this.buf[i] = 0
            }
        }

        on() {
            this._ON = 8;
            this._write_data_cmd();
            this._write_dsp_ctrl();
        }

        off() {
            this._ON = 0;
            this._write_data_cmd();
            this._write_dsp_ctrl();
        }
    }
    /**
     * 创建 TM1640 对象.
     * @param clk the CLK pin for TM1640, eg: DigitalPin.P1
     * @param dio the DIO pin for TM1640, eg: DigitalPin.P2
     * @param intensity the brightness of the LED, eg: 7
     * @param count the count of the LED, eg: 4
     */
    function paibot_TM1640create(port: paibot_digitaltubePort, intensity: number, count: number): paibot_TM1640LEDs {
        let digitaltube = new paibot_TM1640LEDs();
        switch (port) {
            case paibot_digitaltubePort.port1:
                digitaltube.clk = DigitalPin.P2;
                digitaltube.dio = DigitalPin.P1;
                break;
            case paibot_digitaltubePort.port2:
                digitaltube.clk = DigitalPin.P14;
                digitaltube.dio = DigitalPin.P13;
                break;
        }

        if ((count < 1) || (count > 5)) count = 4;
        digitaltube.count = count;
        digitaltube.brightness = intensity;
        digitaltube.init();
        return digitaltube;
    }

    /**
       * @param clk the CLK pin for TM1640, eg: DigitalPin.P1
       * @param dio the DIO pin for TM1640, eg: DigitalPin.P2
       * @param intensity the brightness of the LED, eg: 7
       * @param count the count of the LED, eg: 4
       */
    //% weight=77 blockId=paibot_digitaltube block="digitaltube|%port|intensity %intensity|LED count %count"
    export function paibot_digitaltube(port: paibot_digitaltubePort, intensity: number, count: number) {
        Digitaltube = paibot_TM1640create(port, intensity, count);
    }

    /**
     * show a number. 
     * @param num is a number, eg: 0
     */
    //% weight=76 blockId=paibot_showNumber block="digitaltube show number| %num"
    export function paibot_showNumber(num: number) {
        Digitaltube.showNumber(num);
    }

    /**
     * show a number in given position. 
     * @param num number will show, eg: 5
     * @param bit the position of the LED, eg: 0
     */
    //% weight=75 blockId=paibot_showbit block="digitaltube show digit| %num|at %bit"
    export function paibot_showbit(num: number = 5, bit: number = 0) {
        Digitaltube.showbit(num, bit);
    }

    /**
     * show a hex number. 
     * @param num is a hex number, eg: 0
     */
    //% weight=74 blockId=paibot_showhex block="digitaltube show hex number| %num"
    export function paibot_showhex(num: number) {
        Digitaltube.showHex(num);
    }

    /**
     * show or hide dot point. 
     * @param bit is the position, eg: 1
     * @param show is show/hide dp, eg: true
     */
    //% weight=73 blockId=paibot_showDP block="digitaltube DotPoint at| %bit|show %show"
    export function paibot_showDP(bit: number = 1, show: boolean = true) {
        Digitaltube.showDP(bit, show);
    }

    /**
     * set TM1640 intensity, range is [0-8], 0 is off.
     * @param val the brightness of the TM1640, eg: 7
     */
    //% weight=72 blockId=paibot_intensity block=" digitaltube set intensity %val"
    export function paibot_intensity(val: number = 7) {
        Digitaltube.intensity(val);
    }

    /**
     * turn off LED. 
     */
    //% weight=71 blockId=paibot_off block="turn off digitaltube"
    export function paibot_off() {
        Digitaltube.off();
    }

    /**
     * turn on LED. 
     */
    //% weight=70 blockId=paibot_on block="turn on digitaltube"
    export function paibot_on() {
        Digitaltube.on();
    }

    /**
     * clear LED. 
     */
    //%weight=69 blockId=paibot_clear blockGap=50 block="clear digitaltube"
    export function paibot_clear() {
        Digitaltube.clear();
    }

    const APDS9960_I2C_ADDR = 0x39;
    const APDS9960_ID_1 = 0xA8;
    const APDS9960_ID_2 = 0x9C;
    /* APDS-9960 register addresses */
    const APDS9960_ENABLE = 0x80;
    const APDS9960_ATIME = 0x81;
    const APDS9960_WTIME = 0x83;
    const APDS9960_AILTL = 0x84;
    const APDS9960_AILTH = 0x85;
    const APDS9960_AIHTL = 0x86;
    const APDS9960_AIHTH = 0x87;
    const APDS9960_PERS = 0x8C;
    const APDS9960_CONFIG1 = 0x8D;
    const APDS9960_PPULSE = 0x8E;
    const APDS9960_CONTROL = 0x8F;
    const APDS9960_CONFIG2 = 0x90;
    const APDS9960_ID = 0x92;
    const APDS9960_STATUS = 0x93;
    const APDS9960_CDATAL = 0x94;
    const APDS9960_CDATAH = 0x95;
    const APDS9960_RDATAL = 0x96;
    const APDS9960_RDATAH = 0x97;
    const APDS9960_GDATAL = 0x98;
    const APDS9960_GDATAH = 0x99;
    const APDS9960_BDATAL = 0x9A;
    const APDS9960_BDATAH = 0x9B;
    const APDS9960_POFFSET_UR = 0x9D;
    const APDS9960_POFFSET_DL = 0x9E;
    const APDS9960_CONFIG3 = 0x9F;
    const APDS9960_GCONF4 = 0xAB;
    const APDS9960_AICLEAR = 0xE7;


    /* LED Drive values */
    const LED_DRIVE_100MA = 0;

    /* ALS Gain (AGAIN) values */
    const AGAIN_4X = 1;

    /* Default values */
    const DEFAULT_ATIME = 219;    // 103ms
    const DEFAULT_WTIME = 246;    // 27ms
    const DEFAULT_PROX_PPULSE = 0x87;    // 16us, 8 pulses
    const DEFAULT_POFFSET_UR = 0;       // 0 offset
    const DEFAULT_POFFSET_DL = 0;       // 0 offset      
    const DEFAULT_CONFIG1 = 0x60;    // No 12x wait (WTIME) factor
    const DEFAULT_AILT = 0xFFFF;  // Force interrupt for calibration
    const DEFAULT_AIHT = 0;
    const DEFAULT_PERS = 0x11;    // 2 consecutive prox or ALS for int.
    const DEFAULT_CONFIG2 = 0x01;    // No saturation interrupts or LED boost  
    const DEFAULT_CONFIG3 = 0;       // Enable all photodiodes, no SAI
    const DEFAULT_LDRIVE = LED_DRIVE_100MA;
    const DEFAULT_AGAIN = AGAIN_4X;

    const OFF = 0;
    const POWER = 0;
    const AMBIENT_LIGHT = 1;
    const ALL = 7;

    const red_wb = 2130;
    const green_wb = 3500;
    const blue_wb = 4620;

    function i2cwrite(reg: number, value: number) {
        let buf = pins.createBuffer(2);
        buf[0] = reg;
        buf[1] = value;
        pins.i2cWriteBuffer(APDS9960_I2C_ADDR, buf);
    }

    function i2cread(reg: number): number {
        pins.i2cWriteNumber(APDS9960_I2C_ADDR, reg, NumberFormat.UInt8BE);
        let val = pins.i2cReadNumber(APDS9960_I2C_ADDR, NumberFormat.UInt8BE);
        return val;
    }


    function InitColor(): boolean {
        let id = i2cread(APDS9960_ID);
        //  serial.writeLine("id:")
        //  serial.writeNumber(id); 
        // if (!(id == APDS9960_ID_1 || id == APDS9960_ID_2)) {
        //     return false;
        // }
        //  serial.writeLine("set mode:")
        setMode(ALL, OFF);
        i2cwrite(APDS9960_ATIME, DEFAULT_ATIME);
        i2cwrite(APDS9960_WTIME, DEFAULT_WTIME);
        i2cwrite(APDS9960_PPULSE, DEFAULT_PROX_PPULSE);
        i2cwrite(APDS9960_POFFSET_UR, DEFAULT_POFFSET_UR);
        i2cwrite(APDS9960_POFFSET_DL, DEFAULT_POFFSET_DL);
        i2cwrite(APDS9960_CONFIG1, DEFAULT_CONFIG1);
        setLEDDrive(DEFAULT_LDRIVE);
        setAmbientLightGain(DEFAULT_AGAIN);
        setLightIntLowThreshold(DEFAULT_AILT);
        setLightIntHighThreshold(DEFAULT_AIHT);
        i2cwrite(APDS9960_PERS, DEFAULT_PERS);
        i2cwrite(APDS9960_CONFIG2, DEFAULT_CONFIG2);
        i2cwrite(APDS9960_CONFIG3, DEFAULT_CONFIG3);
        return true;
    }

    function setLEDDrive(drive: number) {
        let val = i2cread(APDS9960_CONTROL);
        /* Set bits in register to given value */
        drive &= 0b00000011;
        drive = drive << 6;
        val &= 0b00111111;
        val |= drive;
        i2cwrite(APDS9960_CONTROL, val);
    }

    function setLightIntLowThreshold(threshold: number) {
        let val_low = threshold & 0x00FF;
        let val_high = (threshold & 0xFF00) >> 8;
        i2cwrite(APDS9960_AILTL, val_low);
        i2cwrite(APDS9960_AILTH, val_high);
    }

    function setLightIntHighThreshold(threshold: number) {
        let val_low = threshold & 0x00FF;
        let val_high = (threshold & 0xFF00) >> 8;
        i2cwrite(APDS9960_AIHTL, val_low);
        i2cwrite(APDS9960_AIHTH, val_high);
    }


    function rgb2hue(r: number, g: number, b: number): number {
        let max = Math.max(r, Math.max(g, b))
        let min = Math.min(r, Math.min(g, b))
        let c = max - min;
        let hue = 0;
        let segment = 0;
        let shift = 0;
        if (c == 0)
            return 0;
        if ((r > g) && (r > b)) {
            segment = (60.0 * (g - b)) / c;
            if (segment < 0)
                hue = segment + 360;
        }
        else if ((g > b) && (g > r)) {
            segment = (60.0 * (b - r)) / c;
            hue = segment + 120;
        }
        else if ((b > g) && (b > r)) {
            segment = (60.0 * (r - g)) / c;
            hue = segment + 240;
        }
        return hue;
    }

    function setMode(mode: number, enable: number) {
        let reg_val = getMode();
        /* Change bit(s) in ENABLE register */
        enable = enable & 0x01;
        if (mode >= 0 && mode <= 6) {
            if (enable > 0) {
                reg_val |= (1 << mode);
            }
            else {
                //reg_val &= ~(1 << mode);
                reg_val &= (0xff - (1 << mode));
            }
        }
        else if (mode == ALL) {
            if (enable > 0) {
                reg_val = 0x7F;
            }
            else {
                reg_val = 0x00;
            }
        }
        i2cwrite(APDS9960_ENABLE, reg_val);
    }

    function getMode(): number {
        let enable_value = i2cread(APDS9960_ENABLE);
        return enable_value;
    }

    function enableLightSensor(interrupts: boolean) {
        setAmbientLightGain(DEFAULT_AGAIN);
        if (interrupts) {
            setAmbientLightIntEnable(1);
        }
        else {
            setAmbientLightIntEnable(0);
        }
        enablePower();
        setMode(AMBIENT_LIGHT, 1);
    }

    function setAmbientLightGain(drive: number) {
        let val = i2cread(APDS9960_CONTROL);
        /* Set bits in register to given value */
        drive &= 0b00000011;
        val &= 0b11111100;
        val |= drive;
        i2cwrite(APDS9960_CONTROL, val);
    }

    function getAmbientLightGain(): number {
        let val = i2cread(APDS9960_CONTROL);
        val &= 0b00000011;
        return val;
    }

    function enablePower() {
        setMode(POWER, 1);
    }

    function setAmbientLightIntEnable(enable: number) {
        let val = i2cread(APDS9960_ENABLE);
        /* Set bits in register to given value */
        enable &= 0b00000001;
        enable = enable << 4;
        val &= 0b11101111;
        val |= enable;
        i2cwrite(APDS9960_ENABLE, val);
    }

    function readAmbientLight(): number {
        let val = i2cread(APDS9960_CDATAL);
        let val_byte = i2cread(APDS9960_CDATAH);
        val = val + val_byte * 256;
        return val;
    }


    /**
     * Initialize the color sensor,please execute at boot time
     */
    //% weight=87 blockId=paibot_init_colorSensor block="Initialize color sensor port at %port"
    export function paibot_init_colorSensor(port: paibot_colorSensorPort) {
        InitColor();
        enableLightSensor(true);
        control.waitMicros(100);
    }

    /**
     *  Color sensor return the color.
     */
    //% weight=86 blockId=paibot_checkCurrentColor block="Current color %color"
    export function paibot_checkCurrentColor(color: paibot_Colors): boolean {
        let c = i2cread(APDS9960_CDATAL) + i2cread(APDS9960_CDATAH) * 256;
        let r = i2cread(APDS9960_RDATAL) + i2cread(APDS9960_RDATAH) * 256;
        let g = i2cread(APDS9960_GDATAL) + i2cread(APDS9960_GDATAH) * 256;
        let b = i2cread(APDS9960_BDATAL) + i2cread(APDS9960_BDATAH) * 256;

        // serial.writeNumber(c);
        // serial.writeLine("->ccc");
        // serial.writeNumber(r);
        // serial.writeLine("->red");
        // serial.writeNumber(g);
        // serial.writeLine("->green");
        // serial.writeNumber(b);
        // serial.writeLine("->blue");

        if (r > red_wb)
            r = red_wb;
        if (g > green_wb)
            g = green_wb;
        if (b > blue_wb)
            b = blue_wb;

        r = Math.round(mapRGB(r, 0, red_wb, 0, 255));
        g = Math.round(mapRGB(g, 0, green_wb, 0, 255));
        b = Math.round(mapRGB(b, 0, blue_wb, 0, 255));
        // serial.writeNumber(r);
        // serial.writeLine("->rred");
        // serial.writeNumber(g);
        // serial.writeLine("->ggreen");
        // serial.writeNumber(b);
        // serial.writeLine("->bblue");
        let hsv = rgb2hue(r, g, b);
        // serial.writeNumber(hsv);
        // serial.writeLine("->hsv");
        let t = paibot_Colors.None;
        if (c > 2200 && r > 65 && g > 65 && b > 65) {
            t = paibot_Colors.White;
        }
        else if (c > 800) {
            if (hsv < 8 || hsv > 350)
                t = paibot_Colors.Red;
            else if (hsv > 60 && hsv < 170) {
                t = paibot_Colors.Green;
            }
            else if (hsv > 210 && hsv < 230) {
                t = paibot_Colors.Blue;
            }
        }
        else if (c > 200 && r > 10 && g > 7 && b > 7 && r < 16.5 && g < 15 && b < 14) {
            t = paibot_Colors.Black;
        }
        return (color == t);
    }

    /**
    * Get the obstacle avoidance sensor status,1 detect obstacle,0 no detect obstacle
    */
    //% weight=85 blockId=paibot_avoidSensor block="Obstacle avoidance sensor|port %port|detect obstacle"
    export function paibot_avoidSensor(port: paibot_touchKeyPort): boolean {
        let status = 0;
        let flag: boolean = false;
        switch (port) {
            case paibot_touchKeyPort.port1:
                pins.setPull(DigitalPin.P1, PinPullMode.PullUp);
                status = pins.digitalReadPin(DigitalPin.P1);
                break;
            case paibot_touchKeyPort.port2:
                pins.setPull(DigitalPin.P13, PinPullMode.PullUp);
                status = pins.digitalReadPin(DigitalPin.P13);
                break;
            case paibot_touchKeyPort.port3:
                pins.setPull(DigitalPin.P16, PinPullMode.PullUp);
                status = pins.digitalReadPin(DigitalPin.P16);
                break;
        }
        if (status == 1)
            flag = false;
        else
            flag = true;
        return flag;
    }


    /**
    * Get the condition of the line follower sensor
    */
    //% weight=84 blockId=paibot_readLineFollowerStatus block="Line follower status|%port|%status"
    export function paibot_readLineFollowerStatus(port: paibot_lineFollowPort, status: paibot_lineFollower): boolean {
        let s1 = 0;
        let s2 = 0;
        
        if (port == paibot_lineFollowPort.port2) {
            pins.setPull(DigitalPin.P13, PinPullMode.PullUp);
            pins.setPull(DigitalPin.P14, PinPullMode.PullUp);
            s1 = pins.digitalReadPin(DigitalPin.P13);
            s2 = pins.digitalReadPin(DigitalPin.P14);
            if(s1 > 0)
                s1 = 1;
            else
                s1 = 0;
            if(s2 > 0)
                s2 = 1;
            else
                s2 = 0;
        }
        else {
            led.enable(false);
            switch (port) {
                case paibot_lineFollowPort.port1:
                    s1 = pins.analogReadPin(AnalogPin.P4);
                    s2 = pins.analogReadPin(AnalogPin.P2);
                    s1 = s1 * 255 / 1023;
                    s2 = s2 * 255 / 1023;
                    break;
                case paibot_lineFollowPort.port4:
                    s1 = pins.analogReadPin(AnalogPin.P3);
                    s2 = pins.analogReadPin(AnalogPin.P1);
                    s1 = s1 * 255 / 1023;
                    s2 = s2 * 255 / 1023;
                    break;                
            }
            led.enable(true);

            if (s1 < 100)
                s1 = 0;
            else
                s1 = 1;
            if (s2 < 100)
                s2 = 0;
            else
                s2 = 1;
        }
       
        let s = ((1 & s1) << 1) | s2;
        if (s == status) {
            return true;
        }
        else {
            return false;
        }               
    }

    /**
     * Get the line follower sensor port ad value
     */
    //% weight=83 blockId=paibot_readLineFollowerValue block="Get line follower |%port|%thod|value"
    export function paibot_readLineFollowerValue(port: paibot_lineFollowPort, thod: number): number {
        let s1 = 0;
        let s2 = 0;

        if (port == paibot_lineFollowPort.port2) {
            pins.setPull(DigitalPin.P13, PinPullMode.PullUp);
            pins.setPull(DigitalPin.P14, PinPullMode.PullUp);
            s1 = pins.digitalReadPin(DigitalPin.P13);
            s2 = pins.digitalReadPin(DigitalPin.P14);
            if(s1 > 0)
                s1 = 1;
            else
                s1 = 0;
            if(s2 > 0)
                s2 = 1;
            else
                s2 = 0;
        }
        else {
            led.enable(false);
            switch (port) {
                case paibot_lineFollowPort.port1:
                    s1 = pins.analogReadPin(AnalogPin.P4);
                    s2 = pins.analogReadPin(AnalogPin.P2);
                    s1 = s1 * 255 / 1023;
                    s2 = s2 * 255 / 1023;
                    break;
                case paibot_lineFollowPort.port4:
                    s1 = pins.analogReadPin(AnalogPin.P3);
                    s2 = pins.analogReadPin(AnalogPin.P1);
                    s1 = s1 * 255 / 1023;
                    s2 = s2 * 255 / 1023;
                    break;                
            }
            led.enable(true);
            if (s1 < thod)
                s1 = 0;
            else
                s1 = 1;
            if (s2 < thod)
                s2 = 0;
            else
                s2 = 1;        
        }
        
        return ((1 & s1) << 1) | s2;
    }
    
    /**
     * Read AD value
     */
    //% weight=32 blockId=paibot_readAdValue block="Read AD value|%channel|value"
    export function paibot_readAdValue(type: paibot_adChannelType): number {
        let adv = 0;
        switch (type) {
            case paibot_adChannelType.adch_0:
                adv = pins.analogReadPin(AnalogPin.P11);
                break;        
            case paibot_adChannelType.adch_2:
                adv = pins.analogReadPin(AnalogPin.P2);
                break;
            case paibot_adChannelType.adch_3:
                adv = pins.analogReadPin(AnalogPin.P1);
                break;  
            case paibot_adChannelType.adch_4:
                adv = pins.analogReadPin(AnalogPin.P0);
                break;   
            case paibot_adChannelType.adch_5:
                led.enable(false);
                adv = pins.analogReadPin(AnalogPin.P3);
                led.enable(true);
                break;   
            case paibot_adChannelType.adch_6:
                led.enable(false);
                adv = pins.analogReadPin(AnalogPin.P4);
                led.enable(true);
                break;   
            case paibot_adChannelType.adch_7:
                led.enable(false);
                adv = pins.analogReadPin(AnalogPin.P10);
                led.enable(true);
                break;                   
        }
        return adv;
    }

    /**
     * Paibot Motion initialization
    */
    //% weight=31 blockId=paibot_motionInit block="Initialize Motion sensor"
    export function paibot_motionInit() {
        motion.init();
    }
    
    /**
     * Get the motion sensor value
     */
    //% weight=30 blockId=paibot_readMotionSensorValue block="Get motion sensor|%type|%axis|value"
    export function paibot_readMotionSensorValue(type: paibot_motionSensorType, axis: paibot_motionSensorAxis): number {
        return motion.rotation(axis);
    }
    
    /**
    * Get the condition of the touch button,press return 1,or return 0
    */
    //% weight=82 blockId=paibot_touchButton block="Touch button|port %port|is pressed"    
    export function paibot_touchButton(port: paibot_touchKeyPort): boolean {
        let status: boolean = false;
        switch (port) {
            case paibot_touchKeyPort.port1:
                pins.setPull(DigitalPin.P1, PinPullMode.PullUp);
                status = !pins.digitalReadPin(DigitalPin.P1);
                break;
            case paibot_touchKeyPort.port2:
                pins.setPull(DigitalPin.P13, PinPullMode.PullUp);
                status = !pins.digitalReadPin(DigitalPin.P13);
                break;
            case paibot_touchKeyPort.port3:
                if (P14_ad > 0xA)
                    status = false;
                else
                    status = true;
                break;
        }
        return status;
    }

    let distanceBak = 0;
    /**
     * Get the distance of ultrasonic detection to the obstacle 
     */
    //% weight=81 blockId=paibot_ultrasonic  block="Ultrasonic|port %port|distance(cm)"
    export function paibot_ultrasonic(port: paibot_ultrasonicPort): number {
        let echoPin: DigitalPin;
        let trigPin: DigitalPin;
        switch (port) {
            case paibot_ultrasonicPort.port1:
                echoPin = DigitalPin.P2;
                trigPin = DigitalPin.P1;
                break;
            case paibot_ultrasonicPort.port2:
                echoPin = DigitalPin.P14;
                trigPin = DigitalPin.P13;
                break;
        }
        pins.setPull(echoPin, PinPullMode.PullNone);
        pins.setPull(trigPin, PinPullMode.PullNone);

        pins.digitalWritePin(trigPin, 0);
        control.waitMicros(2);
        pins.digitalWritePin(trigPin, 1);
        control.waitMicros(10);
        pins.digitalWritePin(trigPin, 0);
        control.waitMicros(5);
        let d = pins.pulseIn(echoPin, PulseValue.High, 25000);
        let distance = d;
        // filter timeout spikes
        if (distance == 0 && distanceBak != 0) {
            distance = distanceBak;
        }
        distanceBak = d;
        return Math.round(distance * 10 / 6 / 58);
    }

    /**
    * Get the ad value of the knob moudule
    */
    //% weight=80 blockId=paibot_getKnobValue  block="Get knob|port %port|value(0~255)"
    export function paibot_getKnobValue(port: paibot_knobPort): number {
        let adValue = pins.analogReadPin(AnalogPin.P1);
        adValue = adValue * 255 / 1023;
        return adValue;
    }

    /**
    * Get the ad value of the photosensitive moudule
    */
    //% weight=79 blockId=paibot_getphotosensitiveValue  block="Get Photosensitive|port %port|value(0~255)"
    export function paibot_getphotosensitiveValue(port: paibot_photosensitivePort): number {
        let adValue = pins.analogReadPin(AnalogPin.P1);
        adValue = adValue * 255 / 1023;
        return 255 - adValue;
    }

    /**
    * Get the Photosensitive sensor status,1 detect bright,0 no detect bright
    */
    //% weight=78 blockId=paibot_photosensitiveSensor blockGap=50 block="Photosensitive sensor|port %port|detect bright"
    export function paibot_photosensitiveSensor(port: paibot_PhotosensitiveSensor): boolean {
        let status = 0;
        let flag: boolean = false;
        switch (port) {
            case paibot_PhotosensitiveSensor.port1:
                pins.setPull(DigitalPin.P2, PinPullMode.PullUp);
                status = pins.digitalReadPin(DigitalPin.P2);
                break;
        }
        if (status == 1)
            flag = false;
        else
            flag = true;
        return flag;
    }

    /**
     * Initialize RGB
     */
    function paibot_initRGBLight() {
        if (!lhRGBLight) {
            lhRGBLight = PaibotRGBLight.create(DigitalPin.P15, 6, PaibotRGBPixelMode.RGB);
        }
        paibot_clearLight();
    }

    /**
         * Set the brightness of the strip. This flag only applies to future operation.
         * @param brightness a measure of LED brightness in 0-255. eg: 255
    */
    //% blockId="paibot_setBrightness" block="set brightness %brightness"
    //% weight=68
    export function paibot_setBrightness(brightness: number): void {
        lhRGBLight.setBrightness(brightness);
    }

    /**
     * Set the color of the colored lights, after finished the setting please perform  the display of colored lights.
     */
    //% weight=67 blockId=paibot_setPixelRGB block="Set|%lightoffset|color to %rgb"
    export function paibot_setPixelRGB(lightoffset: PaibotLights, rgb: PaibotRGBColors) {
        lhRGBLight.setPixelColor(lightoffset, rgb);
    }


    /**
     * Set RGB Color argument
     */
    //% weight=66 blockId=paibot_setPixelRGBArgs block="Set|%lightoffset|color to %rgb"
    export function paibot_setPixelRGBArgs(lightoffset: PaibotLights, rgb: number) {
        lhRGBLight.setPixelColor(lightoffset, rgb);
    }


    /**
     * Display the colored lights, and set the color of the colored lights to match the use. After setting the color of the colored lights, the color of the lights must be displayed.
     */
    //% weight=65 blockId=paibot_showLight block="Show light"
    export function paibot_showLight() {
        lhRGBLight.show();
    }

    /**
     * Clear the color of the colored lights and turn off the lights.
     */
    //% weight=64 blockGap=50 blockId=paibot_clearLight block="Clear light"
    export function paibot_clearLight() {
        lhRGBLight.clear();
    }

    /**
     * Initialize Light belt
     */
    //% weight=63 blockId=paibot_belt_initRGBLight block="Initialize light belt at port %port"
    export function paibot_belt_initRGBLight(port: paibot_ultrasonicPort) {
        switch (port) {
            case paibot_ultrasonicPort.port1:
                if (!lhRGBLightBelt) {
                    lhRGBLightBelt = PaibotRGBLight.create(DigitalPin.P1, 30, PaibotRGBPixelMode.RGB);
                }
                break;
            case paibot_ultrasonicPort.port2:
                if (!lhRGBLightBelt) {
                    lhRGBLightBelt = PaibotRGBLight.create(DigitalPin.P13, 30, PaibotRGBPixelMode.RGB);
                }
                break;
        }

        paibot_clearLight();
    }

    /**
     * Set the color of the colored lights, after finished the setting please perform  the display of colored lights.
     */
    //% weight=62 blockId=paibot_belt_setPixelRGB block="Set light belt|%lightoffset|color to %rgb"
    export function paibot_belt_setPixelRGB(lightoffset: PaibotLightsBelt, rgb: PaibotRGBColors) {
        lhRGBLightBelt.setBeltPixelColor(lightoffset, rgb);
    }

    /**
     * Display the colored lights, and set the color of the colored lights to match the use. After setting the color of the colored lights, the color of the lights must be displayed.
     */
    //% weight=61 blockId=paibot_belt_showLight block="Show light belt"
    export function paibot_belt_showLight() {
        lhRGBLightBelt.show();
    }

    /**
     * Clear the color of the colored lights and turn off the lights.
     */
    //% weight=60 blockGap=50 blockId=paibot_belt_clearLight block="Clear light belt"
    export function paibot_belt_clearLight() {
        lhRGBLightBelt.clear();
    }

    function mapRGB(x: number, in_min: number, in_max: number, out_min: number, out_max: number): number {
        return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    }

    /**
    * Resolve the Bluetooth that phone APP send command type, the total of nine types of commands: tank display command, servo debug command, obtaining the distance of ultrasonic command, obtaining temperature command, obtain sound size rank orders, to obtain the light level command, set the color lights command, honking command, firmware version information command.
    */
    //% weight=59 blockId=paibot_analyzeBluetoothCmd block="Get bluetooth command type %str"
    export function paibot_analyzeBluetoothCmd(str: string): number {
        if (str.length > 6) {
            let cmdHead = str.substr(0, 3);

            if (cmdHead == "CMD") {
                let cmdTypeStr: string = str.substr(4, 2);
                let cmdType = strToNumber(cmdTypeStr);
                if (cmdType > paibot_CmdType.GET_HAND_CMD || cmdType < 0) {
                    return paibot_CmdType.NO_COMMAND;
                }
                else {
                    return cmdType;
                }
            }
            else {
                return paibot_CmdType.NO_COMMAND;
            }
        }
        else {
            return paibot_CmdType.NO_COMMAND;
        }
    }
    /**
     * Resolve the parameters that the phone APP send the command,there are 3 parameters of servo debug command,the other command has just one parameter.
     */
    //% weight=58  blockId=paibot_cgetArgs block="Get bluetooth command|%str|argument at %index"
    //% index.min=1 index.max=3
    export function paibot_getArgs(str: string, index: number): number {
        let cmdType = paibot_analyzeBluetoothCmd(str);
        if (cmdType == paibot_CmdType.NO_COMMAND) {
            return paibot_CarRunCmdType.COMMAND_ERRO;
        }
        else {
            let dataIndex = 7;
            let subLegth = 2;
            if (index == 2) {
                dataIndex = 10;
                subLegth = 2;
            }
            else if (index == 3) {
                dataIndex = 13;
                subLegth = 4;
            }
            if (cmdType == paibot_CmdType.SERVO) {
                if (str.length < 17) {
                    return paibot_CmdType.NO_COMMAND;
                }
            }
            if ((index == 1 && str.length < 10) || (index == 2 && str.length < 13) || (index == 3 && str.length < 17)) {
                return 0;
            }
            let strArgs = str.substr(dataIndex, subLegth);
            let arg = strToNumber(strArgs);
            if (arg == -1)
                return 0;
            return arg;
        }
    }

    /**
     * Returns the enumeration of the command type, which can be compared with this module after obtaining the bluetooth command type sent by the mobile phone APP.
     */
    //% weight=57 blockId=paibot_getBluetoothCmdtype block="Bluetooth command type %type"
    export function paibot_getBluetoothCmdtype(type: paibot_CmdType): number {
        return type;
    }

    /**
     * The command type of the tank is stop, go ahead, back, turn left, turn right, slow down, turn left slowly, turn right slowly.
     */
    //% weight=56 blockId=paibot_getRunCarType block="Car run type %type"
    export function paibot_getRunCarType(type: paibot_CarRunCmdType): number {
        return type;
    }

    /**
     * The distance from the ultrasonic obstacle is the standard command, which is sent to the mobile phone. The APP will indicate the distance of the ultrasonic obstacle.
     */
    //% weight=55 blockId=paibot_convertUltrasonic block="Convert ultrasonic distance %data"
    export function paibot_convertUltrasonic(data: number): string {
        let cmdStr: string = "CMD|03|";
        cmdStr += data.toString();
        cmdStr += "|$";
        return cmdStr;
    }

    /**
     * The conversion temperature value to standard command, sent to the mobile phone, and the APP displays the current temperature.
     */
    //% weight=54 blockId=paibot_convertTemperature block="Convert temperature %data"
    export function paibot_convertTemperature(data: number): string {
        let cmdStr: string = "CMD|04|";
        cmdStr += data.toString();
        cmdStr += "|$";
        return cmdStr;
    }

    /**
     * Convert the light value to the standard command and send it to the mobile phone. The APP displays the current light level (0~255).
     */
    //% weight=53 blockId=paibot_convertLight block="Convert light %data"
    export function paibot_convertLight(data: number): string {
        let cmdStr: string = "CMD|06|";
        cmdStr += data.toString();
        cmdStr += "|$";
        return cmdStr;
    }

    /**
     * Convert the battery value to the standard command and send it to the mobile phone. The APP displays the current voltage.
     */
    //% weight=52 blockId=paibot_convertBattery blockGap=50 block="Convert battery %data"
    export function paibot_convertBattery(data: number): string {
        let cmdStr: string = "CMD|07|";
        cmdStr += data.toString();
        cmdStr += "|$";
        return cmdStr;
    }

    /**
     * Convert the hand cmd to phone app
     */
    //% weight=51 blockId=paibot_convertHandCmd blockGap=50 block="Convert uHand:bit %data"
    export function paibot_convertHandCmd(data: number): string {
        let cmdStr: string = "CMD|15|";
        cmdStr += data.toString();
        cmdStr += "|$";
        return cmdStr;
    }

    /**
     * Connect to the wifi
     */
    //% weight=50 blockId=paibot_connectWifi block="Connect to the Wifi,name|%ssid|and password %passwrd"
    export function paibot_connectWifi(ssid: string, passwrd: string) {
        let buf = pins.createBuffer(ssid.length + passwrd.length + 10);
        buf[0] = 0x55;
        buf[1] = 0x55;
        buf[2] = (ssid.length + passwrd.length + 8) & 0xff;
        buf[3] = 0x3E;//cmd type
        buf[4] = 0x6;
        buf[5] = 0x22;
        for (let i = 0; i < ssid.length; i++) {
            buf[6 + i] = ssid.charCodeAt(i);
        }
        buf[ssid.length + 6] = 0x22;
        buf[ssid.length + 7] = 0x2C;
        buf[ssid.length + 8] = 0x22;
        for (let i = 0; i < passwrd.length; i++) {
            buf[ssid.length + 9 + i] = passwrd.charCodeAt(i);
        }
        buf[ssid.length + passwrd.length + 9] = 0x22;
        serial.writeBuffer(buf);
    }

    /**
     * Detect the device connect status
     */
    //% weight=49 blockId=paibot_isConnectedServer block="Device is connected to server?"
    export function paibot_isConnectedServer(): boolean {
        return connectStatus;
    }

    /**
     * Send get mac address command
     */
    //% weight=48 blockId=paibot_send_getMac block="Send pair command"
    export function paibot_send_getMac() {
        let buf = pins.createBuffer(5);
        buf[0] = 0x55;
        buf[1] = 0x55;
        buf[2] = 0x03;
        buf[3] = 0x3E;//cmd type
        buf[4] = 0x08;
        serial.writeBuffer(buf);
    }

    /**
     * Do someting when Paibot receive mac adress
     * @param body code to run when event is raised
     */
    //% weight=47 blockId=onPaibot_getMac block="on paibot get device id"
    export function onPaibot_getMac(body: Action) {
        control.onEvent(MESSAGE_MAC, 1, body);
    }

    /**
     * Get device mac address
     */
    //% weight=46 blockId=paibot_getMacAddress block="Get device id"
    export function paibot_getMacAddress(): string {
        return macStr + "$";
    }
}
