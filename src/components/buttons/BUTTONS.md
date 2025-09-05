# Botões

## ViewMap
Botao usado somente na pagina **ruas e historias**, leva o user de volta para o root

```tsx
<ViewMap />
```

[ ] Remover e subistiuir por um component mais versatil

## BrownBtn
Botao usado em varias paginas, o botao padrao do site, onclick e disabled são props

```tsx
<BrownBtn onClick={() => {}} disabled={false}>
  Botao
</BrownBtn>
```
## DropDown
Dropdown usado em **Referencias** e **sobre**, tem props de title, items, itemKey, renderItem, className, contentClassName, buttonClassName, defaultOpen, disabled

```tsx
<DropDown title="Organizações" items={data.orgs} itemKey="id" renderItem={(org: Organizacao) => <div>{org.fantasia}</div>} />
```
- [ ] Melhorar o sistema usado, fazer as props fazerem sentido

## PrimaryBtn
Botao quase igual o BrownBtn

```tsx
<PrimaryBtn onClick={() => {}} disabled={false}>
  Botao
</PrimaryBtn>
```
- [ ] Remover ele e subistituir pelo brownBtn

## TransparentBtn
Botao transparente usado no Header, onclick e disabled são props

```tsx
<TransparentBtn onClick={() => {}} disabled={false}>
  Botao
</TransparentBtn>
```