import { Box } from '@material-ui/core';
import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { generate_config } from '../redux/actions/generate';
import {
  MdNavigateNext,
  MdNavigateBefore,
  MdOutlineImportantDevices,
} from 'react-icons/md';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css'

const GenerateConfig = () => {
  let navigate = useNavigate();
  const [config, set_config] = useState<any>({
    price: null,
    number: null,
    gatekeeper: null,
    solTreasuryAccount: '',
    splTokenAccount: null,
    splToken: null,
    goLiveDate: '',
    endSettings: null,
    whitelistMintSettings: null,
    hiddenSettings: null,
    storage: 'arweave',
    ipfsInfuraProjectId: null,
    ipfsInfuraSecret: null,
    nftStorageKey: null,
    awsS3Bucket: null,
    noRetainAuthority: false,
    noMutable: false,
  });

  const generateConfig = (event:any) => {

      if (config.price === null) {
        NotificationManager.warning('Please input price!', 'Alert!', 3000);
        return;
      }
    if (config.number === null) {
      NotificationManager.warning('Please input number!', 'Alert!', 3000);
      return;
    }
    if (
      config.solTreasuryAccount === null ||
      config.solTreasuryAccount === ''
    ) {
      NotificationManager.warning('Please input solTreasuryAccount!', 'Alert!', 3000);
      return;
    }
    localStorage.setItem('count', config.number);
    generate_config(config);
    navigate('/generate_metadata');
    window.scrollTo(0, 0);
    event.preventDefault();
  };

  const importConfig = (import_configFile: any) => {
    const readerConfig: any = new FileReader();
    readerConfig.onload = () => {
      try {
        set_config(JSON.parse(readerConfig.result));
      } catch (e: any) {
        NotificationManager.error('Not invalid Json file!', 'Error!', 3000);
      }
    };
    if (import_configFile !== undefined) {
      readerConfig.readAsText(import_configFile);
    }
  };

  return (
    <StyledComponent>
      <InputPanel01>
        <HeadText01>Input correct values to generate confige file</HeadText01>
        <GridPanel>
          <GridBox01>
            <Text01>price:</Text01>
            <Input01
              component={'input'}
              {...{ type: 'number' }}
              {...{
                value: config.price === null ? '' : config.price,
              }}
              {...{ placeholder: 'price for each NFT.' }}
              onChange={(e: any) => {
                if (parseFloat((e.target as HTMLInputElement).value) < 0) {
                  NotificationManager.error('Must be greater than or equal to 0!', 'Error!', 3000);
                  set_config({ ...config, ...{ price: 0 } });
                  return;
                }
                if (isNaN(parseFloat((e.target as HTMLInputElement).value))) {
                  set_config({
                    ...config,
                    ...{
                      price: null,
                    },
                  });
                  return;
                }
                set_config({
                  ...config,
                  ...{
                    price: parseFloat((e.target as HTMLInputElement).value),
                  },
                });
              }}
            ></Input01>
          </GridBox01>
          <GridBox01>
            <Text01>number:</Text01>
            <Input01
              component={'input'}
              // {...{ type: 'text' }}
              // {...{ value: config.number === null ||config.number ===NaN ? '' : config.number }}
              // {...{ pattern: '[0-9]*' }}
              // {...{ placeholder: 'total amount to mint NFTs.' }}
              // onChange={(e: any) => {
              //   e.target.validity.valid &&
              //     set_config({
              //       ...config,
              //       ...{ number: parseInt(e.target.value) },
              //     });
              //   e.target.validity.valid && set_count(parseInt(e.target.value));
              // }}
              {...{ type: 'number' }}
              {...{
                value: config.number === null ? '' : config.number,
              }}
              {...{ placeholder: 'total amount to mint NFTs.' }}
              onChange={(e: any) => {
                if (parseInt((e.target as HTMLInputElement).value) < 1) {
                  NotificationManager.error('Must be greater than or equal to 1!', 'Error!', 3000);
                  set_config({ ...config, ...{ number: 1 } });
                  return;
                }
                if (isNaN(parseInt((e.target as HTMLInputElement).value))) {
                  set_config({
                    ...config,
                    ...{
                      number: null,
                    },
                  });
                  return;
                }
                set_config({
                  ...config,
                  ...{
                    number: parseInt((e.target as HTMLInputElement).value),
                  },
                });
              }}
            ></Input01>
          </GridBox01>
          <GridBox01>
            <Text01>gatekeeper:</Text01>
            <Input01
              component={'input'}
              {...{ type: 'text' }}
              {...{
                value: config.gatekeeper === null ? '' : config.gatekeeper,
              }}
              {...{ placeholder: 'default value is null.' }}
              onChange={e => {
                let temp: any = { ...config };
                console.log((e.target as HTMLInputElement).value);
                if ((e.target as HTMLInputElement).value === '') {
                  temp.gatekeeper = null;
                } else {
                  temp.gatekeeper = (e.target as HTMLInputElement).value;
                }
                set_config(temp);
              }}
            ></Input01>
          </GridBox01>
          <GridBox01>
            <Text01>solTreasuryAccount:</Text01>
            <Input01
              component={'input'}
              {...{ type: 'text' }}
              {...{
                value:
                  config.solTreasuryAccount === null
                    ? ''
                    : config.solTreasuryAccount,
              }}
              fontSize="1rem"
              {...{ placeholder: 'input your wallet address.' }}
              onChange={e => {
                let temp: any = { ...config };
                if ((e.target as HTMLInputElement).value === '') {
                  temp.solTreasuryAccount = null;
                } else {
                  temp.solTreasuryAccount = (
                    e.target as HTMLInputElement
                  ).value;
                }
                set_config(temp);
              }}
            ></Input01>
          </GridBox01>
          <GridBox01>
            <Text01>splToken:</Text01>
            <Input01
              component={'input'}
              {...{ type: 'text' }}
              {...{ placeholder: 'default value is null.' }}
              {...{ value: config.splToken === null ? '' : config.splToken }}
              onChange={e => {
                let temp: any = { ...config };
                if ((e.target as HTMLInputElement).value === '') {
                  temp.splToken = null;
                } else {
                  temp.splToken = (e.target as HTMLInputElement).value;
                }
                set_config(temp);
              }}
            ></Input01>
          </GridBox01>
          <GridBox01>
            <Text01>splTokenAccount:</Text01>
            <Input01
              component={'input'}
              {...{ type: 'text' }}
              {...{ placeholder: 'default value is null.' }}
              {...{
                value:
                  config.splTokenAccount === null ? '' : config.splTokenAccount,
              }}
              onChange={e => {
                let temp: any = { ...config };
                if ((e.target as HTMLInputElement).value === '') {
                  temp.splTokenAccount = null;
                } else {
                  temp.splTokenAccount = (e.target as HTMLInputElement).value;
                }
                set_config(temp);
              }}
            ></Input01>
          </GridBox01>
          <GridBox01>
            <Text01>goLiveDate:</Text01>
            <Input01
              component={'input'}
              {...{ type: 'datetime-local' }}
              {...{
                value: config.goLiveDate === null ? '' : config.goLiveDate,
              }}
              {...{ placeholder: 'select live date.' }}
              onChange={e => {
                let temp: any = { ...config };
                if ((e.target as HTMLInputElement).value === '') {
                  temp.goLiveDate = null;
                } else {
                  temp.goLiveDate = (e.target as HTMLInputElement).value;
                }
                set_config(temp);
              }}
            ></Input01>
          </GridBox01>
          <GridBox01>
            <Text01>endSettings:</Text01>
            <Input01
              component={'input'}
              {...{ type: 'text' }}
              {...{ placeholder: 'default value is null.' }}
              {...{
                value: config.endSettings === null ? '' : config.endSettings,
              }}
              onChange={e => {
                let temp: any = { ...config };
                if ((e.target as HTMLInputElement).value === '') {
                  temp.endSettings = null;
                } else {
                  temp.endSettings = (e.target as HTMLInputElement).value;
                }
                set_config(temp);
              }}
            ></Input01>
          </GridBox01>
          <GridBox01>
            <Text01>whitelistMintSettings:</Text01>
            <Input01
              component={'input'}
              {...{ type: 'text' }}
              {...{ placeholder: 'default value is null.' }}
              {...{
                value:
                  config.whitelistMintSettings === null
                    ? ''
                    : config.whitelistMintSettings,
              }}
              onChange={e => {
                let temp: any = { ...config };
                if ((e.target as HTMLInputElement).value === '') {
                  temp.whitelistMintSettings = null;
                } else {
                  temp.whitelistMintSettings = (
                    e.target as HTMLInputElement
                  ).value;
                }
                set_config(temp);
              }}
            ></Input01>
          </GridBox01>
          <GridBox01>
            <Text01>hiddenSettings:</Text01>
            <Input01
              component={'input'}
              {...{ type: 'text' }}
              {...{ placeholder: 'default value is null.' }}
              {...{
                value:
                  config.hiddenSettings === null ? '' : config.hiddenSettings,
              }}
              onChange={e => {
                let temp: any = { ...config };
                if ((e.target as HTMLInputElement).value === '') {
                  temp.hiddenSettings = null;
                } else {
                  temp.hiddenSettings = (e.target as HTMLInputElement).value;
                }
                set_config(temp);
              }}
            ></Input01>
          </GridBox01>
          <GridBox01>
            <Text01>storage:</Text01>
            <Select01>
              <FormControl fullWidth>
                <Select
                  value={config.storage}
                  onChange={(e: any) => {
                    let temp: any = { ...config };
                    temp.storage = e.target.value;
                    set_config(temp);
                  }}
                >
                  <MenuItem value={'arweave-sol'}>arweave-sol</MenuItem>
                  <MenuItem value={'arweave-bundle'}>arweave-bundle</MenuItem>
                  <MenuItem value={'arweave'}>arweave</MenuItem>
                  <MenuItem value={'ipfs'}>ipfs</MenuItem>
                  <MenuItem value={'pinata'}>pinata</MenuItem>
                  <MenuItem value={'nft-storage'}>nft-storage</MenuItem>
                  <MenuItem value={'aws'}>aws</MenuItem>
                </Select>
              </FormControl>
            </Select01>
            {/* <Input01
              component={'input'}
              {...{ type: 'text' }}
              {...{ value: config.storage === null ? '' : config.storage }}
              onChange={e => {
                let temp: any = { ...config };

                temp.storage = (e.target as HTMLInputElement).value;
                set_config(temp);
              }}
            ></Input01> */}
          </GridBox01>
          <GridBox01>
            <Text01>ipfsInfuraProjectId:</Text01>
            <Input01
              component={'input'}
              {...{ type: 'text' }}
              {...{ placeholder: 'default value is null.' }}
              {...{
                value:
                  config.ipfsInfuraProjectId === null
                    ? ''
                    : config.ipfsInfuraProjectId,
              }}
              onChange={e => {
                let temp: any = { ...config };
                if ((e.target as HTMLInputElement).value === '') {
                  temp.ipfsInfuraProjectId = null;
                } else {
                  temp.ipfsInfuraProjectId = (
                    e.target as HTMLInputElement
                  ).value;
                }
                set_config(temp);
              }}
            ></Input01>
          </GridBox01>
          <GridBox01>
            <Text01>ipfsInfuraSecret:</Text01>
            <Input01
              component={'input'}
              {...{ type: 'text' }}
              {...{ placeholder: 'default value is null.' }}
              {...{
                value:
                  config.ipfsInfuraSecret === null
                    ? ''
                    : config.ipfsInfuraSecret,
              }}
              onChange={e => {
                let temp: any = { ...config };
                if ((e.target as HTMLInputElement).value === '') {
                  temp.ipfsInfuraSecret = null;
                } else {
                  temp.ipfsInfuraSecret = (e.target as HTMLInputElement).value;
                }
                set_config(temp);
              }}
            ></Input01>
          </GridBox01>
          <GridBox01>
            <Text01>nftStorageKey:</Text01>
            <Input01
              component={'input'}
              {...{ type: 'text' }}
              {...{ placeholder: 'default value is null.' }}
              {...{
                value:
                  config.nftStorageKey === null ? '' : config.nftStorageKey,
              }}
              onChange={e => {
                let temp: any = { ...config };
                if ((e.target as HTMLInputElement).value === '') {
                  temp.nftStorageKey = null;
                } else {
                  temp.nftStorageKey = (e.target as HTMLInputElement).value;
                }
                set_config(temp);
              }}
            ></Input01>
          </GridBox01>
          <GridBox01>
            <Text01>awsS3Bucket:</Text01>
            <Input01
              component={'input'}
              {...{ type: 'text' }}
              {...{ placeholder: 'default value is null.' }}
              {...{
                value: config.awsS3Bucket === null ? '' : config.awsS3Bucket,
              }}
              onChange={e => {
                let temp: any = { ...config };
                if ((e.target as HTMLInputElement).value === '') {
                  temp.awsS3Bucket = null;
                } else {
                  temp.awsS3Bucket = (e.target as HTMLInputElement).value;
                }
                set_config(temp);
              }}
            ></Input01>
          </GridBox01>
          <GridBox01>
            <Text01>noRetainAuthority:</Text01>
            <Select01>
              <FormControl fullWidth>
                <Select
                  value={config.noRetainAuthority === false ? 'false' : 'true'}
                  onChange={(e: any) => {
                    let temp: any = { ...config };
                    if (e.target.value === 'false') {
                      temp.noRetainAuthority = false;
                    } else {
                      temp.noRetainAuthority = true;
                    }
                    set_config(temp);
                  }}
                >
                  <MenuItem value={'false'}>false</MenuItem>
                  <MenuItem value={'true'}>true</MenuItem>
                </Select>
              </FormControl>
            </Select01>
          </GridBox01>
          <GridBox01>
            <Text01>noMutable:</Text01>
            <Select01>
              <FormControl fullWidth>
                <Select
                  value={config.noMutable === false ? 'false' : 'true'}
                  onChange={(e: any) => {
                    let temp: any = { ...config };
                    if (e.target.value === 'false') {
                      temp.noMutable = false;
                    } else {
                      temp.noMutable = true;
                    }
                    set_config(temp);
                  }}
                >
                  <MenuItem value={'false'}>false</MenuItem>
                  <MenuItem value={'true'}>true</MenuItem>
                </Select>
              </FormControl>
            </Select01>
          </GridBox01>
        </GridPanel>
        <GeneratePart>
          <GenerateButton
            onClick={() => {
              navigate('/');
              window.scrollTo(0, 0);
            }}
          >
            <MdNavigateBefore fontSize={'1.8rem'} fontWeight={'bolder'} />
            <Box display={'flex'}>BEFORE</Box>
          </GenerateButton>

          <label {...{ htmlFor: 'upload' }}>
            <GenerateButton>
              <MdOutlineImportantDevices
                fontSize={'1.5rem'}
                fontWeight={'bolder'}
              />
              <Box display={'flex'} ml="5px">
                IMPORT
              </Box>
            </GenerateButton>
          </label>
          <input
            id={'upload'}
            type="file"
            accept=".json"
            onChange={(e: any) => importConfig(e.target.files[0])}
            hidden
          />

          <GenerateButton onClick={(event: any) => generateConfig(event)}>
            <Box display={'flex'}>NEXT</Box>
            <MdNavigateNext fontSize={'1.8rem'} fontWeight={'bolder'} />
          </GenerateButton>
          
        </GeneratePart>
      </InputPanel01>
      <NotificationContainer />
    </StyledComponent>
  );
};

const StyledComponent = styled(Box)`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const InputPanel01 = styled(Box)`
  display: flex;
  width: 85%;
  height: 80%;
  color: white;
  background-color: #176180;
  /* border-radius: 20px; */
  flex-direction: column;
  align-items: center;
`;

const GridPanel = styled(Box)`
  display: grid;
  height: 60%;
  width: 90%;
  margin-top: auto;
  margin-bottom: auto;
  grid-template-columns: auto auto auto;
`;

const GridBox01 = styled(Box)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const HeadText01 = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: auto;
  margin-bottom: auto;
  font-size: 2.3rem;
  font-weight: bold;
  color: white;
`;

const GeneratePart = styled(Box)`
  display: flex;
  width: 50%;
  margin-top: auto;
  margin-bottom: auto;
  justify-content: center;
  align-items: center;
`;

const GenerateButton = styled(Box)`
  display: flex;
  width: 150px;
  height: 60px;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.3rem;
  font-weight: bold;
  background-color: #54c3e7;
  /* border-radius: 8px; */
  margin-left: auto;
  margin-right: auto;
  cursor: pointer;
  transition: 0.5s;
  &:hover {
    color: #176180;
    background-color: white;
  }
`;
const Text01 = styled(Box)`
  display: flex;
  color: white;
  font-size: 1.3rem;
`;
const Input01 = styled(Box)`
  display: flex;
  margin-left: 10px;
  /* border-radius: 8px; */
  height: 30px;
  outline: none;
  border: 2px solid white;
  /* border: null; */
  align-items: center;
  font-size: 1.3rem;
  width: 250px;
  color: #176180;
  transition: 0.3s;
  &:hover{
    border: 2px solid #54c3e7;
  }
`;
const Select01 = styled(Box)`
  display: flex;
  margin-left: 10px;
  /* border-radius: 8px; */
  height: 30px;
  align-items: center;
  font-size: 1.3rem;
  width: 250px;
  &:hover {
    transition: 0.3s;
  }
  .MuiPaper-root {
    background-color: white !important;
    color: black !important;
  }
  .MuiInput-underline:after {
    border-bottom: 2px solid white;
  }
  .MuiFormLabel-root.Mui-focused {
    color: white;
  }
  .Mui-selected{
    font-size: 1.3rem;  
    font-weight: bold;
  }
  .MuiInputBase-root{
    font-size: 1.3rem;
    font-weight: bold;
  }
`;

export default GenerateConfig;
