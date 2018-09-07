export interface ExampleDataType {
    name: string;
    folders?: ExampleDataType[];
    files?: string[]
};

const Data: ExampleDataType[] = [
    {
        name: '公司文库',
        folders: [
            {
                name: '公司管理制度',
                folders: [
                    {
                        name: '部门文件夹-SUB',
                        files: [
                            '部门文件夹---1',
                            '部门文件夹---2',
                            '部门文件夹---3',
                            '部门文件夹---4',
                        ]
                    },
                    {
                        name: '会议记录-SUB',
                        files: [
                            '会议记录----1',
                            '会议记录----2'
                        ]
                    }
                ]
            },
            {
                name: '部门文件夹',
                files: [
                    '部门文件夹---1',
                    '部门文件夹---2',
                    '部门文件夹---3',
                    '部门文件夹---4',
                ]
            },
            {
                name: '会议记录',
                files: [
                    '会议记录----1',
                    '会议记录----2'
                ]
            }
        ]
    },
    {
        name: '我的文库',
        folders: [
            {
                name: '工作备忘',
                folders: [
                    {
                        name: '多媒体资料-SUB',
                        files: [
                            '多媒体资料---1',
                            '多媒体资料---2',
                            '多媒体资料---3'
                        ]
                    },
                    {
                        name: '资料存档-SUB',
                        files: [
                            '资料存档---1',
                            '资料存档---2',
                            '资料存档---3'
                        ]
                    }
                ]
            },
            {
                name: '多媒体资料',
                files: [
                    '多媒体资料---1',
                    '多媒体资料---2',
                    '多媒体资料---3'
                ]
            },
            {
                name: '资料存档',
                files: [
                    '资料存档---1',
                    '资料存档---2',
                    '资料存档---3'
                ]
            }
        ]
    }
]

export default Data;