---
title: 'Sơ lược về Tuple trong C#'
date: '2021-09-29'
tags: ['c#']
---

## Mình thường xài `Tuple` như thế nào

Đôi khi cần một cấu trúc dữ liệu đơn giản để chứa 2 đến 3 thuộc tính, ví dụ như `UserName` bên dưới.

```csharp
class UserName
{
    public string FirstName {get; set;}
    public string LastName {get; set;}
}

UserName GetUserName()
{
    //code
}
```

Lúc này dùng Tuple không cần tạo thêm class hay struct.

```csharp
(string FirstName, string LastName) GetUserName()
{
    //code
}
```

Có thể gán giá trị cho tuple như vầy

```csharp
(string FirstName, string LastName) name1 = ("Truc", "Nguyen");
```

Hoặc như vầy

```csharp
var name2 = (LastName: "Nguyen", FirstName: "Truc");
```

Hoặc như vầy 😁

```csharp
string FirstName = "Truc";
string LastName = "Nguyen";
var name = (FirstName, LastName);
```

Để lấy giá trị ra từ Tuple có thể viết (người ta gọi là **destructing**)

```csharp
// code bên trên
(string fName, string lName) = name;
```

> Trước C# 7.0 thì Tuple không xịn được như vầy (có thể khái báo được `FirstName`, `LastName` strong tuple), vì các thuộc tính là `Item1`, `Item2`, `Item3`...

## References

- https://docs.microsoft.com/en-us/dotnet/csharp/whats-new/csharp-7
